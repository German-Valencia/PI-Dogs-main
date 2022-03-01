const { Router } = require("express");
const dogsRoute = require("./dogsRoute");
const temperamentRoute = require("./temperamentRoute");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogsRoute);
router.use("/temperaments", temperamentRoute);

module.exports = router;
