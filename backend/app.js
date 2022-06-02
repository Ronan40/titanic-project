const express = require('express');
/* const bodyParser = require('body-parser'); */
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const cors = require("cors");
const path = require('path');

const userRoutes = require('./routes/user');

// Connection à MongoDB/Atlas : 

mongoose.connect("mongodb+srv://Ronan40:Eringobragh40@titanic-project.caffj.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();

// Autorise et refuse les appels HTTP : 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json())
  app.use('/', userRoutes);

module.exports = app;