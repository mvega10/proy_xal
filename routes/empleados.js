/* Creamos la ruta para empleados en:\proy_xal\routes\empleados.js */
const express = require('express');
const router = express.Router();
const empleados = require('../services/empleados');


/* GET empleados consulta todos en lista. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await empleados.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error al obtener empleados `, err.message);
    next(err);
  }
});

/* POST empleados inserta */
router.post('/', async function(req, res, next) {
  try {
    res.json(await empleados.create(req.body));
  } catch (err) {
    console.error(`Error al publicar empleados `, err.message);
    next(err);
  }
});

/* GET empleados consulta por id_empleado. */
router.get('/consulta/:id_empleado', async function(req, res, next) {
  try {
    res.json(await empleados.obtenerPorId(req.params.id_empleado));
  } catch (err) {
    console.error(`Error al obtener empleados X Id `, err.message);
    next(err);
  }
});

/* GET empleados elimina x id. */
router.delete('/eliminar/:id_empleado', async function(req, res, next) {
 
  try {
    res.json(await empleados.eliminar(req.params.id_empleado));
    
  } catch (err) {
    console.error(`Error al eliminar empleados `, err.message);
    next(err);
  }
});

module.exports = router;
