'use strict'

const express = require('express');
const ProjectController = require('../controllers/product');
const CommentController = require('../controllers/comment');
const UserController = require('../controllers/user');

var router = express.Router();


var multiPart = require('connect-multiparty');
//var multiPartMidleWare = multiPart({uploadDir: './uploads'});

// ----------- GETS
router.get('/', ProjectController.def);
router.get('/home', ProjectController.home);
router.get('/tosignup', ProjectController.disablePage);
router.get('/tosigin', ProjectController.tosigin);
router.get('/newprod', ProjectController.enterProd);
router.get('/create1', ProjectController.createProduct);
router.get('/getproducts', ProjectController.getProducts);


router.get('/getcomments', CommentController.getComments);
router.get('/:id', ProjectController.oneProduct);

//-------- POSTS
router.post('/verytok', ProjectController.verytok);
router.post('/save-project', ProjectController.saveProject);
router.post('/signup', ProjectController.register);
router.post('/signin', ProjectController.sigin);

router.post('/newcomment', CommentController.saveComment);




module.exports = router;