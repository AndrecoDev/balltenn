#!/usr/bin/env node
"use strict";

(async () => {
    try {
        require("./environment");
        const bodyParser = require("body-parser");
        const mongoose = require("mongoose");
        const express = require("express");
        const fileUpload = require('express-fileupload');

        const app = require("./src/app");
        const errorHandler = require("./src/helpers/errorHandler");

        const server = express();


        // const credentials = {
        //     key: fs.readFileSync('/var/www/certs/5a0013866d6c624f.crt'),
        //     cert: fs.readFileSync('/var/www/certs/final.key')
        // };

        await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log("Conectado a la Base de Datos");


        server.use(function (req, res, next) {
            var allowedOrigins = process.env.ALLOWED_ORIGIN_CORS.split(", ");
            var origin = req.headers.origin;
            if (allowedOrigins.indexOf(origin) > -1) {
                res.setHeader('Access-Control-Allow-Origin', origin);
            }
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.header('Access-Control-Allow-Credentials', true);
            next();
        });

        server.use(bodyParser.json({ limit: '10mb', extended: true }));

        server.use(fileUpload({
            useTempFiles: true,
            tempFileDir: './uploads/products/'
        }));

        server.use(process.env.ROUTE_PREFIX, app);

        server.use(errorHandler);

        // expressApp.use(express.static("www")).use(function (req, res) {
        //     res.sendFile(__dirname + '/www/index.html');
        // });

        server.listen(parseInt(process.env.LISTEN_PORT), function () {
            console.log("Escuchando puerto " + process.env.LISTEN_PORT);
        });

        // https.createServer(credentials, expressApp).listen(8081);

    } catch (error) {
        console.error("Ocurrió el siguiente error:", process.env.NODE_ENV == "production" ? error.message : error.stack);
    }
})();