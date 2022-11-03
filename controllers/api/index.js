const router = require('express').Router();
const bookingRoutes = require('./booking-routes');
const userRoutes = require('./user-routes')

router.use('/bookings', bookingRoutes);
router.use('/users',userRoutes)

module.exports = router;