const { Seating } = require("../models");

const seatingData = [
  {
    seating_time: "6 PM",
  },
  {
    seating_time: "8 PM",
  },
];

const seedSeating = () => Seating.bulkCreate(seatingData);

module.exports = seedSeating;
