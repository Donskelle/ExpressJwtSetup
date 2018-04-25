const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');
const { mail } = require('../helpers/mail');
var crypto = require('crypto');



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
      return res.status(400).json({ status: false, error: 'E-Mail is already in use' });
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
      await newUser.createHashedPassword();
      await newUser.save();
    } catch (error) {
      res.status(400).json({ status: false, error });
      next()
    }
    // Generate the token
    const token = signToken(newUser);
    const responseUser = newUser.toJSON();

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
    req.user.set(req.body);
    if (req.file && req.file.cloudStoragePublicUrl)
      req.user.image = req.file.cloudStoragePublicUrl;

    req.user.save(function (err) {
      if (err) return res.status(400).json(error);

      res.json(req.user.toJSON());
    });
  },

  replacePassword: async (req, res, next) => {
    User.findOne({ 'local.resetPasswordToken': req.body.token, 'local.resetPasswordExpires': { $gt: Date.now() } }, async function (err, user) {
      if (!user) {
        return res.status(400).json({ error: "Benutzer nicht gefunden." });
      }
      user.local.password = req.body.password;
      user.local.resetPasswordToken = undefined;
      user.local.resetPasswordExpires = undefined;

      try {
        user.createHashedPassword();
        await user.save();
      } catch (error) {
        res.status(400).json({ status: false, error });
        next();
      }
      const token = signToken(user);
      const responseUser = user.toJSON();

      res.status(200).json({ token, user: responseUser });
    });
  },

  resetPassword: async (req, res, next) => {
    User.findOne({ 'local.email': req.body.email }, function (err, user) {
      if (!user) {
        return res.status(400).json({ error: "Benutzer nicht gefunden." });
      }
      const token = crypto.randomBytes(20).toString('hex');
      user.local.resetPasswordToken = token;
      user.local.resetPasswordExpires = Date.now() + 3600000;

      user.save(function (error, user) {
        if (error) return res.status(400).json({ error });

        const msg = {
          to: req.body.email,
          from: 'info@transportiert.de',
          subject: 'Passwort zurücksetzten',
          text: `http://localhost:3000/PasswortVergessen/${token} Token ${token}`,
        };
        mail.send(msg);

        res.status(200).json({ message: "Eine Mail zur Wiederherstellung des Passworts ist unterwegs." });
      });
    });
  },
}