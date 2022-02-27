const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

const url = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

// conseguir todos los perros

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
      };
    });
    return datainfo;
  } catch (error) {
    console.error(error);
  }
};

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
};
