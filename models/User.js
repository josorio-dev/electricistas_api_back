const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersElectriciansSchema = new Schema({
    firstName: String,
    lastName: String,
    enrollment: String,
    location: String,
    email: String
});

/* To use our schema defined, we need to convert our electriciansSchema into a Model we can work with. To do so, we pass it into > mongoose.model( <modelName>, <schemaName> ) */
const usersElectricians = mongoose.model('userElectricians', usersElectriciansSchema); 

module.exports = usersElectricians;




//Un modelo es una plantilla, estan basados en esquemas. 