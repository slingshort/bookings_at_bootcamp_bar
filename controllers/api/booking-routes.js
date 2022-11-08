const router = require("express").Router();
const { Booking, Seating } = require("../../models");
const moment = require("moment-timezone");

router.get("/", async (req, res) => {
  try {
    // Check for active session
    if (req.session?.logged_in) {
      // find all bookings for the active user
      const data = await Booking.findAll({
        where: {
          user_id: req.session.user_id,
        },
        include: [{ model: Seating }],
        attributes: {
          exclude: ["seating_id", "user_id"],
        },
      });

      res.json(
        data.map((booking) => {
          return {
            ...booking.dataValues,
            date: moment(booking.dataValues.date)
              .tz("Australia/Sydney")
              .format("DD/MM/YYYY"),
          };
        })
      );
    } else {
      res.status(401).json({ message: "Invalid session!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Check for active session
    if (req.session?.logged_in) {
      // find a single booking by `id` for the active user
      const data = await Booking.findOne({
        where: {
          id: req.params.id,
          user_id: req.session?.user_id,
        },
        include: [{ model: Seating }],
        attributes: {
          exclude: ["seating_id", "user_id"],
        },
      });
      if (data) {
        res.status(200).json({
          ...data.dataValues,
          date: moment(data.dataValues.date)
            .tz("Australia/Sydney")
            .format("DD/MM/YYYY"),
        });
      } else {
        res.status(404).json({ message: "No booking with this id!" });
      }
    } else {
      res.status(401).json({ message: "Invalid session!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new booking
  try {
    // User can only book for themselves
    if (req.session?.user_id == req.body?.user_id) {
      const data = await Booking.create({
        ...req.body,
        date: moment(req.body.date, "DD/MM/YYYY")
          .tz("Australia/Sydney")
          .toISOString(),
      });
      res.status(200).json(data);
    } else {
      res.status(400).json({ message: "Invalid payload!" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    // Check for active session
    if (req.session?.logged_in) {
      // update a booking by `id` for the active user
      let data = await Booking.findOne({
        where: {
          id: req.params.id,
          user_id: req.session?.user_id,
        },
      });
      if (data) {
        let updates = req.body;
        if (updates?.date) {
          updates.date = moment(updates.date, "DD/MM/YYYY")
            .tz("Australia/Sydney")
            .toISOString();
        }
        data = await Booking.update(updates, {
          where: {
            id: req.params.id,
          },
        });
        if (data[0]) {
          res.status(200).json({ message: "Success" });
        } else {
          res.status(400).json({ message: "Invalid payload!" });
        }
      } else {
        res.status(404).json({ message: "No Booking with this id!" });
      }
    } else {
      res.status(401).json({ message: "Invalid session!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Check for active session
    if (req.session?.logged_in) {
      // delete booking by `id`  for the active user
      const data = await Booking.destroy({
        where: {
          id: req.params.id,
          user_id: req.session?.user_id,
        },
      });
      if (data) {
        res.status(200).json({ message: "Success" });
      } else {
        res.status(404).json({ message: "No Booking with this id!" });
      }
    } else {
      res.status(401).json({ message: "Invalid session!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
