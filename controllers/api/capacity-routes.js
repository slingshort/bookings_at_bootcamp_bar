const router = require('express').Router();
const moment = require('moment-timezone');
const { Sequelize } = require('sequelize');
const { Booking, Seating } = require('../../models');
const { BAR_CAPACITY } = require('../../config');

router.post('/', async (req, res) => {
  try {
    const capacity = {
      '6PM': BAR_CAPACITY,
      '8PM': BAR_CAPACITY,
    };
    // parse the date string to ISO string to match date in database
    const date = moment(req.body?.date, 'YYYY-MM-DD').toISOString();

    const data = await Booking.findAll({
      attributes: [[Sequelize.fn('SUM', Sequelize.col('seats')), 'booked']],
      raw: true,
      where: {
        date,
      },
      group: 'seating_id',
      include: [{ model: Seating, attributes: ['time'] }],
    });

    data.forEach((item) => {
      switch (item['seating.time']) {
      case '6PM':
        capacity['6PM'] -= parseInt(item.booked);
        break;
      case '8PM':
        capacity['8PM'] -= parseInt(item.booked);
        break;
      default:
        break;
      }
    });
    res.json(capacity);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
