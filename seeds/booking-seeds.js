const { Booking } = require('../models');
const moment = require('moment-timezone');

const bookingData = [
  {
    date: moment('07/11/2022', 'DD/MM/YYYY')
      .tz('Australia/Sydney')
      .toISOString(),
    seats: 5,
    seating_id: 1,
    user_id: 1,
  },
  {
    date: moment('07/11/2022', 'DD/MM/YYYY')
      .tz('Australia/Sydney')
      .toISOString(),
    seats: 10,
    seating_id: 1,
    user_id: 2,
  },
  {
    date: moment('07/11/2022', 'DD/MM/YYYY')
      .tz('Australia/Sydney')
      .toISOString(),
    seats: 6,
    seating_id: 2,
    user_id: 1,
  },
  {
    date: moment('07/11/2022', 'DD/MM/YYYY')
      .tz('Australia/Sydney')
      .toISOString(),
    seats: 9,
    seating_id: 2,
    user_id: 2,
  },
];

const seedBooking = () => Booking.bulkCreate(bookingData);

module.exports = seedBooking;
