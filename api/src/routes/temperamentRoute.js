const axios = require("axios");
const express = require("express");
const { Temperament } = require("../db");
const { getTemperaments } = require("./functions");

const router = express.Router();

router.get("/", async (req, res) => {
  const temperaments = await getTemperaments();
  const allTemperaments = await Temperament.findAll({ order: [['name', 'ASC'],] });
  return res.status(200).send(allTemperaments);
});

module.exports = router;
