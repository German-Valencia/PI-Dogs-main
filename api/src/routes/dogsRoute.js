const express = require("express");
const { Dog } = require("../db");
const { getAllDogs } = require("./functions");

const router = express.Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  const allDogsName = await getAllDogs();
  try {
    if (name) {
      let dog = allDogsName.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      dog.length
        ? res.status(200).send(dog)
        : res.status(404).send("Dog not found");
    } else {
      res.status(200).send(allDogsName);
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const dogsTotal = await getAllDogs();
  try {
    if (id) {
      let dogsId = dogsTotal.filter((e) => e.id.toString() === id);
      dogsId.length
        ? res.status(200).json(dogsId)
        : res.status(404).send("Dog not found");
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
