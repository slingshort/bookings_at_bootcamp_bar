const router = require("express").Router();
const bookingRoutes = require("./booking-routes");
const userRoutes = require("./user-routes");
const loginRoute = require("./login-route");
const logoutRoute = require("./logout-route");
const capacityRoutes = require("./capacity-routes");

router.use("/bookings", bookingRoutes);
router.use("/users", userRoutes);
router.use("/login", loginRoute);
router.use("/logout", logoutRoute);
router.use("/capacity", capacityRoutes);

module.exports = router;
