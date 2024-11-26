const passport = require('passport');
const bcrypt = require("bcryptjs");
const prismaQueries = require('../queries');
const pool = require('../db/pool');
const { validationResult } = require('express-validator');
