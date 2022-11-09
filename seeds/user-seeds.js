const { User } = require('../models');

const userData = [
  {
    first_name: 'John',
    last_name: 'Smith',
    email: 'john@gmail.com',
    password: 'ILovePotato',
    is_subscriber: true,
  },
  {
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane@gmail.com',
    password: 'Watermelon',
    is_subscriber: true,
  },
];

const seedUser = () =>
  User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

module.exports = seedUser;
