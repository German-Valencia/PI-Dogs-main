const express = require("express");
const { getAllDogs } = require("./functions");
const { Dog, Temperament } = require("../db");

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

router.post("/", async (req, res) => {
  const { name, height, weight, life_span, temperaments, image } = req.body;
  try {
    if (name) {
      const allDog = await getAllDogs();
      const isDog = allDog.find((e) => e.name === name.toLowerCase());
      if (!isDog) {
        const dog = await Dog.create({
          name,
          height,
          weight,
          life_span,
          image,
        });
        const temperamentDb = await Temperament.findAll({
          where: {
            name: temperaments,
          },
        });
        await dog.addTemperament(temperamentDb);
        return res.status(201).send("successfully created dog");
      }
      return res.status(404).send("Dog name already exist");
    }
    if (!name) return res.status(404).send("Dog name is obligatory");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
