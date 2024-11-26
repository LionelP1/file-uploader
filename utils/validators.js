const { body, validationResult } = require('express-validator');

exports.validateUser = [
    body('first_name')
        .notEmpty().withMessage('First name is required')
        .isAlpha().withMessage('First name can only contain letters'),

    body('last_name')
        .notEmpty().withMessage('Last name is required')
        .isAlpha().withMessage('Last name can only contain letters'),

    body('username')
        .notEmpty().withMessage('Username is required')
        .isAlphanumeric().withMessage('Username can only contain letters and numbers')
        .isLength({ min: 3, max: 15 }).withMessage('Username must be between 3 and 15 characters'),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter'),

    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
];