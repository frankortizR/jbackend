'use strict'

const Product = require('../models/product');
const User = require('../models/user');
const fs = require('fs');
const jwt = require('jsonwebtoken');



var controller = {
    home: function (req, res) {
        res.render('home', {title: 'home'});
        //return res.status(200).send('fuck the hello world');
    },

    def: function(req, res){
        res.render('index', {title: 'home'});
    },
    
    enterProd: function (req, res, next) {
        res.render('newprod', {title: 'newprod'});
    },

    createProduct: function (req, res) {
        Product.create({
            title: 'nada1',
            description: 'nada2',
            precio: 23.23 
        });
        res.send("se termino de crear");

    },

    saveProject: function(req, res){
        var product = new Product();
        var params = req.body;
        product.title = params.title;
        product.price = params.price;
        product.imgp = params.imgp;
        product.description = params.description;
        product.save((err, productStored) => {
            if(err) return res.status(500).send({meesage: "hubo un error guardando"});

            if(!productStored) return res.status(404).send({message: "no se pudo guardar"});

            return res.status(200).send({product: productStored, message: "guardado correctamente"});
        });
    },

    getProducts: async function (req, res) {
        const result = await Product.find();
        res.json(result);
    },

    oneProduct: function (req, res) {
        var productId = req.params.id;
        Product.findById(productId, (err, product) => {
            if (err) return res.status(500).send({
                meesage: "error al devolver el producto"
            });
            if (!product) return res.status(404).send({
                message: "el producto no existe"
            });
            return res.status(200).send({
                product
            });
        });
    },
    register: async function (req, res, next) {
        const usuario = req.body;
        const user = await User.findOne({'username': usuario.username});
        if(user){
            res.status(200).send({message: 'username ya utilizado', valid: false});
            return false;
        }
        //-----------------------------------------
        const newuser = new User({
            username: usuario.username,
            password: usuario.password 
        });
        newuser.password = await newuser.encryptPas(newuser.password);
        console.log(newuser);
        await newuser.save();

        const token = jwt.sign({id: newuser._id}, process.env.SECRET, {
            expiresIn: 60*60*24
        });
        res.json({message: 'ok got it', auth: true, token});
    },

    toregister: function (req, res) {
        res.render('register', {title: 'register'});
    },
    
    tosigin: function (req, res) {
        res.render('sigin', {title: 'signin'});
    },

    sigin: async function (req, res) {
        const entrante = req.body;
        //res.status(200).send({message: 'entrando en calor', nombre: entrante.username});
        const user = await User.findOne({'username': entrante.username});
        if(!user){
            res.status(200).send({message: 'datos no validos', valid: false});
            return false;
        } else{
            const pasval = await user.validPas(entrante.password)
            if(pasval == false){
                res.status(200).send({message: 'contra incorrecta', valid:false});
                return false;
            }
            const token = jwt.sign({id: user._id}, process.env.SECRET, {
                expiresIn: 60*60*24
            });
            res.json({message: 'alright, entra', auth: true, token});
        }
    },

    verytok: async function (req, res) {
        const tover = req.body;
        //res.status(200).send({message: 'si funciona el verytok', pasado: tover.token});
        const respuesta = await jwt.verify(tover.token, process.env.SECRET, function (err, decoded) {
            if(err) return res.status(200).send({auth:false, message:err});
            return decoded;
            //res.status(200).send({decoded: decoded});
            //console.log(decode);
            //next();           
        });
        
        const user = await User.findById(respuesta.id);
        if(!user){
            res.status(200).send({message: 'no se reconoce el usuario', auth: false});
        } else {
            res.status(200).send({message: 'usuario verificado', auth: true});
        }
        
        
    },

    disablePage: function (req, res) {
        res.render('disablepage', {title: 'signin'});
    }
}

module.exports = controller;
