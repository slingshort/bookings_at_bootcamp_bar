const { Seating } = require('../models');

const seatingData = [
  {
    time: '6 PM',
  },
  {
    time: '8 PM',
  },
];

const seedSeating = () => Seating.bulkCreate(seatingData);

module.exports = seedSeating;
