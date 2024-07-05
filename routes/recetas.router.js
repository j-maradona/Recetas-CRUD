const express = require("express");
const router = express.Router();
const controller = require("../controllers/recetas.controller");

router.get('/', controller.index);  // Mostrar Todas Las Recetas
router.get("/:id", controller.show);  // Mostrar Receta Por ID
router.post("/", controller.store); // Crear Receta
router.put("/:id", controller.update); // Editar Receta
router.delete("/:id", controller.destroy); // Eliminar Receta

module.exports = router;
