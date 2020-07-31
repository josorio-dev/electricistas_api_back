//Aquí vamos a tener todos los metodos que vamos a utilizar para realizar acciones.
//Controles
const User = require('../models/User');
const { all } = require('../app');

//Registrar nuevo usuario
function create(req, res) {
/* 

* @params {*} req: lo que viene por la uri o el body
* @params {*} res: respuesta que retorna 

*/
    var user = new User(); //Crear nuevo usuario conforme al modelo que definimos en User.js
    var params = req.body;

    //Obtener cada uno de los parametros para guardar los datos
    user.firstName = params.firstName;
    user.lastName = params.lastName;
    user.enrollment = params.enrollment;
    user.location = params.location;
    user.email = params.email;

    user.save( (error, userCreated) => {
        if (error) {
            res.status(500).send({
                statusCode: 500,
                message: 'Internal server error.'
            });
        } else if (!userCreated) {
            res.status(400).send({
                statusCode: 400,
                message: '[Error] Bad Request. User not created.'
            });
        } else {
            res.status(200).send({
                statusCode: 200,
                message: '[OK] User successfully created',
                userData: userCreated
            });
        }
    });
    console.log('Parametros insertados =>', params);
}
//Modificar y actualizar datos de usuario
function update(req, res) {
    var dataUser = req.body;
    var id = req.params.id;
    User.findByIdAndUpdate(id, dataUser, (error, userUpdate) => {
        if (error) {
            res.status(500).send({
                statusCode: 500,
                message: 'Internal server error.'
            });
        } else if (!userUpdate) {
            res.status(400).send({
                statusCode: 400,
                message: '[Error] Bad Request. User not update.'
            });
        } else {
            res.status(200).send({
                statusCode: 200,
                message: '[OK] USER UPDATE.'
            });
        }
    });
}
//Borrar datos de usuario por id
function remove(req, res) {
    var id = req.params.id;
    User.findByIdAndDelete(id, (error, userDeleted) => {
        if (error) {
            res.status(500).send({
                statusCode: 500,
                message: 'Internal server error.'
            });
        } else if (!userDeleted) {
            res.status(400).send({
                statusCode: 400,
                message: '[Error] Bad Request. User not deleted.'
            });
        } else {
            res.status(200).send({
                statusCode: 200,
                message: '[OK] USER DELETED.'
            });
        }
    });
}
//Buscar todos los electricistas registrados
function getAll(req, res) {
    User.find({ }, (error, allUsers) => {
        if (error) {
            res.send({
                statusCode: 404,
                message: 'FILE NOT FOUND'
            });
        } else {
            res.send({
                statusCode: 200,
                message: 'Resultados de la búsqueda:',
                dataUser: allUsers
            });
        }
    });
}
//Buscar electricistas por ubicación
function getUserByLocation(req, res) {
    var location = req.params.location;
    User.find({ location: location }, (error, usersByLocation) => {
        if (error) {
            res.send({
                statusCode: 404,
                message: 'FILE NOT FOUND'  
            });
        } else if (usersByLocation == false) {
            res.send({
                message: 'La busqueda ha arrojado 0 resultados'
            })
        } else {
            res.send({
                statusCode: 200,
                message: `Electricistas en ${ location } encontrados:`,
                dataUser: usersByLocation
            });
        }
    });
}

module.exports = {
    create,
    update,
    remove,
    getAll,
    getUserByLocation
}

