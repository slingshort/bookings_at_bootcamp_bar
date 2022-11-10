const seedBooking = require('./booking-seeds');
const seedSeating = require('./seating-seeds');
const seedUser = require('./user-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedSeating();
  console.log('\n----- SEATINGS SEEDED -----\n');

  await seedUser();
  console.log('\n----- USERS SEEDED -----\n');

  await seedBooking();
  console.log('\n----- BOOKINGS SEEDED -----\n');

  process.exit(0);
};

seedAll();
