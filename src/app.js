const express = require('express');
const cors = require('cors');
const morgan = require('morgan');//es para hacer log-detectar errores
const db = require('./utils/database');
const initModels = require('./models/initModels');
const AuthRoutes = require('./routes/auth.routes');
const transporter = require('./utils/mailer');

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

    // transporter.verify()//solo para verificar que esta bien
    //     .then(() => console.log("transporter is OK"))
    //     .catch((error) => console.log(error))

    // const sendEmail = async () => {
    //     await transporter.sendMail({
    //         from: "adolfozamora1005@gmail.com",
    //         to:"adolfozamora1005@gmail.com",
    //         subjetc: "yo soy el mejor programador",
    //         text: "hola nodeMailer",
    //         html: "<h1> Hola node mailer con html</h1>"
    //     });
    // };

    // sendEmail();

app.get('/', (req, res) => {
    res.json ({ message: 'Welcome to my server'});
});

app.use('/api/v1/auth', AuthRoutes);

module.exports = app;