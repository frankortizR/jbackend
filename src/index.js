'use strict'
 
const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();
const PORT = process.env.PORT || 3700;



const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.4wnqu.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose.Promise = global.Promise;


mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology:true})
                .then(() => {
                    console.log('----------Conexion a base de datos con exito weon!----');
                    
                    //creacion del servidor
                    app.listen(PORT, () => {
                        console.log(`----------Conexion al servidor en el ${process.env.PORT} successfully----------`);
                        
                    });
                }
                )
                .catch(err => console.log(err)); 
/* const express = require('express');
const app = express();

app.set('port', 3700);

app.listen(3700, () => {
    console.log('estamos conectados al 3700 macho');
}); */