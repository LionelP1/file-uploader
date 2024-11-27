const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const prismaQueries = require("../prisma/queries");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prismaQueries.findUserByUsername(username);

      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prismaQueries.findUserById(id);

    if (!user) {
      return done(new Error("User not found"));
    }

    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;