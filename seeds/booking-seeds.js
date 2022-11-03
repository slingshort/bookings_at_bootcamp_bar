const { Booking } = require("../models");

const bookingData = [
  {
    date: new Date().toLocaleDateString("en-AU"),
    seats: 5,
    seating_time: 1,
    user_id: 1,
  },
  {
    date: "04/11/2022",
    seats: 5,
    seating_time: 1,
    user_id: 2,
  },
];

const seedBooking = () => Booking.bulkCreate(bookingData);

module.exports = seedBooking;
