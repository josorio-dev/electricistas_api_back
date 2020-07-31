const mongoose = require('mongoose');
const colors = require('colors/safe');
const app = require('./app');
const port = 3000;

mongoose.connect('mongodb://localhost:27017/apiElectricistas', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(colors.red(console, 'connection error:')));
db.once('open', () => {
    console.log(colors.yellow('Sucessful connection mongodb'));
    app.listen(port, () => {
        console.log(colors.yellow(`Server port on ${ port }`));
    });
})

