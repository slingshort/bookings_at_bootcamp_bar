// import models
const Booking = require("./Booking");
const Seating = require("./Seating");
const User = require("./User");

// Bookings belong to user
Booking.belongsTo(User, {
  foreignKey: "user_id",
});

// User has many Booking
User.hasMany(Booking, {
  foreignKey: "user_id",
});

module.exports = {
  Booking,
  Seating,
  User,
};