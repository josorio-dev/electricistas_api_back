const express = require('express');
const api = express.Router(); //Crear rutas o paths
const userController = require('../controllers/userController');
/* 
    GET para obtener datos
    POST para insertar datos
    PUT para actualizar/modificar datos
    DELETE para eliminar datos
*/
api.get('/', userController.getAll);

api.get('/filtro/:location', userController.getUserByLocation);

api.post('/', userController.create);

api.put('/:id', userController.update);

api.delete('/:id', userController.remove);

module.exports = api;