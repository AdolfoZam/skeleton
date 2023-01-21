const express = require('express');
const cors = require('cors');
const morgan = require('morgan');//es para hacer log-detectar errores
const db = require('./utils/database');
const initModels = require('./models/initModels');
const AuthRoutes = require('./routes/auth.routes');

const app = express();//instancia de express

app.use(express.json());
app.use(cors());//se instala para origines cruzados, ej: peticiones de  netlfy
app.use(morgan('tiny'));

initModels();

db.authenticate()
    .then(() => console.log("Base de datos autenticada"))
    .catch((error) => console.log(error));

db.sync({force: false})
    .then(() => console.log("Base de datos sincronizada"))
    .catch((error) => console.log(error))

app.get('/', (req, res) => {
    res.json ({ message: 'Welcome to my server'});
});

app.use('/api/v1/auth', AuthRoutes);

module.exports = app;