const router = require("express").Router();
const { User } = require("../../models");

router.get("/", async (req, res) => {
  // find all user
  try {
    const data = await User.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single user by its `id`
  try {
    const data = await User.findByPk(req.params.id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "No user with this id!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new user
  try {
    const data = await User.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a user name by its `id` value
  try {
    let data = await User.findByPk(req.params.id);
    if (data) {
      data = await User.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (data[0]) {
        res.status(200).json({ message: " Success" });
      } else {
        res.status(400).json({ message: "Invalid payload" });
      }
    } else {
      res.status(404).json({ message: "No user with this id!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete user by its `id` value
  try {
    const data = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (data) {
      res.status(200).json({ message: "Success" });
    } else {
      res.status(404).json({ message: "No user with this id!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
