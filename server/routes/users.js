const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const images = require('../helpers/images');



router.route('/')
  .post(validateBody(schemas.signupSchema), UsersController.signUp)
  .get(passportJWT, UsersController.getOwnUser)
  .put(passportJWT, images.multer.single('image'), images.sendUploadToGCS, validateBody(schemas.updateUserSchema), UsersController.updateUser);

router.route('/:id')
  .get(UsersController.getUser);

router.route('/signin')
  .post(validateBody(schemas.authSchema), passportSignIn, UsersController.signIn);

router.route('/emailavailable')
  .post(validateBody(schemas.emailAvailableSchema), UsersController.emailAvailable);

/*router.route('/oauth/google')
  .post(passport.authenticate('googleToken', { session: false }), UsersController.googleOAuth);*/

router.route('/oauth/facebook')
  .post(passport.authenticate('facebookToken', { session: false }), UsersController.facebookOAuth);

module.exports = router;