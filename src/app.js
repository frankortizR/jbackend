'use strict'
var express = require('express');
var bodyparser = require('body-parser');
var app = express();
const cors = require('cors');
const path =  require('path');

//archivos de rutas
var project_routes = require('./routes/product');

//middlewares
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, 'public')));

//settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname+'/views'));
//app.engine('html', require('ejs').renderFile);



//CORS

var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
// Configurar cabeceras y cors
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');//en lugar del asterisco irian los dominios permitidos
   res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
   res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
   next();
}); 

app.use(cors());
app.use( '/', project_routes);



//exports

module.exports = app;