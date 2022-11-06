const router = require("express").Router();
const bookingRoutes = require("./booking-routes");
const userRoutes = require("./user-routes");
const loginRoute = require("./login-route");
const logoutRoute = require("./logout-route");

router.use("/bookings", bookingRoutes);
router.use("/users", userRoutes);
router.use("/login", loginRoute);
router.use("/logout", logoutRoute);

module.exports = router;
