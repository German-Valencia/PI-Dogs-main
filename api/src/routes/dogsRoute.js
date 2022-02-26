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
        e.name.tolewerCase().includes(name.toLowerCase())
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

module.exports = router;
