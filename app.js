require('dotenv').config();
const express = require('express');
const path = require('node:path');
const methodOverride = require('method-override');
const app = express();
const passport = require('./config/passport');
const sessionConfig = require("./config/session");

const authRoutes = require("./routes/authRoutes");
const renderRoutes = require("./routes/renderRoutes");
const folderRoutes = require("./routes/folderRoutes");
const fileRoutes = require("./routes/fileRoutes");

app.set("views", path.join(__dirname, "views"));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(sessionConfig);
app.use(passport.session());

app.use("/", renderRoutes);
app.use("/", authRoutes);
app.use("/", folderRoutes);
app.use("/", fileRoutes);

app.use((req, res) => {
  res.status(404).render('error', {
    status: 404,
    message: 'Page not found',
    details: 'The page you are looking for does not exist.'
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Something went wrong. Please try again later.';
  const details = err.details || 'No additional details are available.';

  res.status(statusCode).render('error', {
    status: statusCode,
    message: message,
    details: details
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});