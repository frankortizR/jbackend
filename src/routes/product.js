'use strict'

const express = require('express');
const ProjectController = require('../controllers/product');
const CommentController = require('../controllers/comment');
const UserController = require('../controllers/user');

var router = express.Router();


var multiPart = require('connect-multiparty');
//var multiPartMidleWare = multiPart({uploadDir: './uploads'});

router.get('/', ProjectController.def);
router.get('/home', ProjectController.home);
router.get('/tosignup', ProjectController.disablePage);
router.get('/tosigin', ProjectController.tosigin);
router.get('/newprod', ProjectController.enterProd);
router.post('/verytok', ProjectController.verytok);
router.get('/create1', ProjectController.createProduct);
router.get('/getproducts', ProjectController.getProducts);
router.get('/:id', ProjectController.oneProduct);
router.post('/save-project', ProjectController.saveProject);
router.post('/signup', ProjectController.register);
router.post('/signin', ProjectController.sigin);



module.exports = router;