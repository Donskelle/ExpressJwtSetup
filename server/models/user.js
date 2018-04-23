const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const sanitizerPlugin = require('mongoose-sanitizer');

const Schema = mongoose.Schema;



// Create a schema
const userSchema = new Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    required: true,
  },
  local: {
    password: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
  },
  google: {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
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
    required: true,
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
    required: true,
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


userSchema.pre('save', async function (next) {
  try {
    if (this.method !== 'local') {
      next();
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(this.local.password, salt);
    // Re-assign hashed version over original, plain text password
    this.local.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
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