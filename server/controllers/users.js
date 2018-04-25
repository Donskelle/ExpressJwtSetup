const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');

signToken = user => {
  return JWT.sign({
    iss: 'Transportiert',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password, first_name, last_name, birth_year, commercial, gender } = req.value.body;

    // Check if there is a user with the same email
    const foundUser = await User.findOne({ 'local.email': email });
    if (foundUser) {
      return res.status(403).json({ error: 'E-Mail is already in use' });
    }
      

    // Create a new user
    const newUser = new User({
      method: 'local',
      local: {
        email,
        password,
      },
      first_name,
      last_name,
      gender,
      birth_year,
    });

    try {
      await newUser.createHash();
      await newUser.save();
    } catch (error) {
      res.status(400).json(error);
      next()
    }

    // Generate the token
    const token = signToken(newUser);
    const responseUser  = newUser.toJSON();
    
    // Respond with token
    res.status(200).json({ token, user: responseUser });
  },

  signIn: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    const user = req.user.toJSON();
    res.status(200).json({ token, user });
  },

  emailAvailable: async (req, res, next) => {
    const foundUser = await User.findOne({ 'local.email': req.body.email });
    let emailAvailable = true;
    if (foundUser) {
      emailAvailable = false;
    }
    res.status(200).json({ emailAvailable });
  },

  facebookOAuth: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token, user: req.user });
  },

  getUser: async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (user)
      res.json(user.toJSON());
    else {
      res.json({});
    }
  },

  getOwnUser: async (req, res, next) => {
    res.json(req.user.toJSON());
  },
  updateUser: async (req, res, next) => {
    console.log(req.body);
    req.user.set(req.body);
    if(req.file && req.file.cloudStoragePublicUrl)
      req.user.image = req.file.cloudStoragePublicUrl;

    req.user.save(function (err) {
      if (err) return res.status(400).json(error);

      res.json(req.user.toJSON());
    });
    
  },
}