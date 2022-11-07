const router = require("express").Router();
const moment = require("moment-timezone");
const { Sequelize } = require("sequelize");
const { Booking, Seating } = require("../../models");
const { BAR_CAPACITY } = require("../../config");

router.post("/", async (req, res) => {
  try {
    // parse the date string to ISO string to match date in database
    const date = moment(req.body?.date, "DD/MM/YYYY").toISOString();

    const data = await Booking.findAll({
      attributes: [[Sequelize.fn("SUM", Sequelize.col("seats")), "booked"]],
      raw: true,
      where: {
        date,
      },
      group: "seating_id",
      include: [{ model: Seating, attributes: ["time"] }],
    });

    res.json(
      data.map((item) => {
        return {
          available: BAR_CAPACITY - parseInt(item.booked),
          seating: item["seating.time"],
        };
      })
    );
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
