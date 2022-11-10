// nodemailer
const { User, booking, seating } = require('../models');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport ({
    service:"gmail",
    auth: {
      user:"bootcamp.bar.bookings@gmail.com",
      pass:"b00tcamp123"
    },
    tls: {
        rejectUnauthorized: false,
    },
  })

let info = await transporter.sendMail({
    from: "bootcamp.bar.bookings@gmail.com",
    to: {},
    subject: '"Booking Confirmation',
    text: "Your booking at"
})
