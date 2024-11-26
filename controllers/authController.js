const passport = require('passport');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const prismaQueries = require('../prisma/queries');

exports.handleLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
};

exports.handleLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(400).render('auth/login', {
        errors: [{ msg: 'Invalid username or password' }],
        data: req.body,
      });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect('/messages');
    });
  })(req, res, next);
};

exports.createUser = async (req, res, next) => {
  const { first_name, last_name, username, password, confirmPassword } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('auth/signup', {
      errors: errors.array(),
      data: req.body,
    });
  }

  try {
    const existingUser = await prismaQueries.findUserByUsername(username);

    if (existingUser) {
      return res.status(400).render('auth/signup', {
        errors: [{ msg: 'Username already taken' }],
        data: req.body,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prismaQueries.createUser(username, first_name, last_name, hashedPassword);

    req.login(newUser, (err) => {
      if (err) return next(err);
      res.redirect('/messages');
    });
  } catch (err) {
    return next(err);
  }
};
