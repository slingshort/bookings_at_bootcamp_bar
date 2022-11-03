// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const hbs = exphbs.create({});
const routes = require("./controllers");
const sequelize = require("./config/connection");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Set Handlebars as the default template engine.
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

// Starts the server to begin listening
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:" + PORT);
  });
});
