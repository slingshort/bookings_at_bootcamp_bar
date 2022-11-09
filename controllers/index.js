const router = require('express').Router();
const { Booking, Seating } = require('../models');
const apiRoutes = require('./api');
const moment = require('moment-timezone');

router.use('/api', apiRoutes);

// landing page (static file)
router.get('/', async (req, res) => {
  res.render('login');
});

// singup page (static file)
router.get('/signup', async (req, res) => {
  res.render('signup');
});

// bookings page
router.get('/bookings', async (req, res) => {
  try {
    // Check for active session
    if (req.session?.logged_in) {
      // find all bookings for the active user
      let bookings = await Booking.findAll({
        where: {
          user_id: req.session.user_id,
        },
        include: [{ model: Seating }],
        attributes: {
          exclude: ['seating_id', 'user_id'],
        },
      });
      bookings = bookings.map((booking) => {
        booking = booking.get({ plain: true });
        booking.date = moment(booking.date)
          .tz('Australia/Sydney')
          .format('DD/MM/YYYY');
        return booking;
      });
      res.render('bookings', { bookings });
    } else {
      res.redirect('/');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.use((req, res) => {
  res.send('<h1>Wrong Route!</h1>');
});

module.exports = router;
