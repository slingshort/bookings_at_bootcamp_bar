const router = require("express").Router();
const { Booking } = require("../../models");

router.get("/", async (req, res) => {
  // find all booking
  try {
    const data = await Booking.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single booking by its `id`
  try {
    const data = await Booking.findByPk(req.params.id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "No booking with this id!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new booking
  try {
    console.log(req);
    const data = await Booking.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a booking by its `id` value
  try {
    let data = await Booking.findByPk(req.params.id);
    if (data) {
      data = await Booking.update(req.body, {
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
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete booking by its `id` value
  try {
    const data = await Booking.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (data) {
      res.status(200).json({ message: "Success" });
    } else {
      res.status(404).json({ message: "No Booking with this id!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
