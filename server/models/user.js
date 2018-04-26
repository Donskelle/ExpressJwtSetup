const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const sanitizerPlugin = require('mongoose-sanitizer');

const Schema = mongoose.Schema;



// Create a schema
const userSchema = new Schema({
  method: {
    type: String,
    enum: ['local', 'facebook'],
  },
  local: {
    password: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  facebook: {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
  },
  gender: {
    type: String,
    enum: ['Herr', 'Frau'],
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  phone: {
    type: String,
  },
  birth_year: {
    type: Number,
  },
  ustid: {
    type: String,
  },
  commercial: {
    type: Boolean,
    default: false,
  },
  insurance: {
    type: String,
  },
  company: {
    name: String,
    address: {
      street: String,
      city: String,
      zip: String
    },
  },
  description: {
    type: String,
  }
});

// checks every field value for dangerous code before saveing to db
userSchema.plugin(sanitizerPlugin);

userSchema.virtual('fullName').
  get(function () { return this.first_name + ' ' + this.last_name; });



userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
}
userSchema.methods.createHashedPassword = async function () {
  try {
    if (this.method == 'local') {
      // Generate a salt
      const salt = await bcrypt.genSalt(10);
      // Generate a password hash (salt + hash)
      const passwordHash = await bcrypt.hash(this.local.password, salt);
      // Re-assign hashed version over original, plain text password
      this.local.password = passwordHash;
    }
  } catch (error) {
    next(error);
  }
}

userSchema.methods.deleteUserData = async function () {
  try {
    if (this.method == 'local') {
      this.local.password = undefined;
      this.local.email = undefined;
    }
    else if(this.method == 'facebook') {
      this.facebook.id = undefined;
      this.facebook.email = undefined;
    }
    
    this.first_name = 'Gelöschter';
    this.last_name = 'Benutzer';
    this.birth_year = undefined;
    this.image = undefined;
    this.ustid = undefined;
    this.commercial = undefined;
    this.phone = undefined;
    this.insurance = undefined;
    this.company = undefined;
    this.gender = undefined;
  } catch (error) {
    next(error);
  }
}


userSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.local;
    delete ret.facebook;
    return ret;
  }
};



// Create a model
const User = mongoose.model('user', userSchema);

// Export the model
module.exports = User;