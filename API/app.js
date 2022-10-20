require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

// Routes
const router = require('./routes/Router.js');

// DB Connection
const conn = require('./db/conn.js');

// API port
const port = process.env.API_PORT;

// App start
const app = express();

// Config JSON and Form data Response
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Solve CORS
app.use(cors({ credentials: true, origin: process.env.CORS_URL }));

// Upload Dir
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Routes
app.use(router);

// Sync DB
conn.sync()
    //.sync({ force: true }) // Força a recriação da tabela e elimina os dados
    .then(() => {
        
        app.listen(port, () => {
            console.log('App rodando na porta: ', port);
        })

    }).catch(err => console.log(err));