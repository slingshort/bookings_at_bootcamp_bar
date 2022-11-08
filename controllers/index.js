const router = require("express").Router();
const { Booking, User } = require("../models");
const apiRoutes = require("./api");



router.use("/api", apiRoutes);

// landing page (static file)
router.get('/', async(req,res) => {
  res.render('login')
})

// singup page (static file)
router.get('/signup', async(req,res) => {
  res.render('signup',)
})

// bookings page
router.get('/bookings', async(req,res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Booking,
          attributes: [
            'date',
            'seats',
            'seating_id'
          ],
        },
      ],
    });

    const user = userData.get({plain: true});
    res.render('bookings', {user});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
