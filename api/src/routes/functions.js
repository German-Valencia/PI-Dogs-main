const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

const url = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

// conseguir todos los perros de la api

const getApiInfo = async () => {
  try {
    let info = await axios.get(url).then((r) => {
      return r.data;
    });
    const datainfo = info.map((e) => {
      return {
        id: e.id,
        name: e.name,
        height: e.height.metric,
        weight: e.weight.metric,
        life_span: e.life_span,
        image: e.image.url,
        temperament: e.temperament,
        temperaments: e.temperaments,
      };
    });
    return datainfo;
  } catch (error) {
    console.error(error);
  }
};

// conseguir todos los perros de la BD
const getDbInfo = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

// conseguir todos los temperamentos de la api y guardarlos en la BD
const getTemperaments = async () => {
  try {
    const temperamentsApi = await getApiInfo();
    const temperamentsAll = await temperamentsApi
      .map((e) => e.temperament)
      .toString()
      .trim()
      .split(/\s*,\s*/);
    const temperamentsList = [...new Set(temperamentsAll)]; // quitamos temperamentos repetidos

    const temperamentsUnique = temperamentsList.filter(Boolean);

    temperamentsUnique.forEach((e) => {
      Temperament.findOrCreate({
        where: { name: e },
      });
    });

    return temperamentsUnique;
  } catch (error) {
    console.error(error);
  }
};

//unión de api con bd
const getAllDogs = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const allDogs = [...apiInfo, ...dbInfo];
  return allDogs;
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllDogs,
  getTemperaments,
};
