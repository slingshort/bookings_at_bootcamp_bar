const { Booking } = require("../models");
const moment = require("moment-timezone")
console.log(moment('2022/11/07', 'YYYY/MM/DD').tz('Australia/Sydney').toISOString())

const bookingData = [
  {
    date: "2022/11/07",
    seats: 5,
    seating_id: 1,
    user_id: 1,
  },
  {
    date: "2022/11/07",
    seats: 10,
    seating_id: 1,
    user_id: 2,
  },
  {
    date: "2022/11/07",
    seats: 6,
    seating_id: 2,
    user_id: 1,
  },
  {
    date: "2022/11/07",
    seats: 9,
    seating_id: 2,
    user_id: 2,
  },
];

const seedBooking = () => Booking.bulkCreate(bookingData);

module.exports = seedBooking;
