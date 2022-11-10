const { Seating } = require('../models');

const seatingData = [
  {
    time: '6PM',
  },
  {
    time: '8PM',
  },
];

const seedSeating = () => Seating.bulkCreate(seatingData);

module.exports = seedSeating;
