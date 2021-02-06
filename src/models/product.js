const {Schema, model} =require('mongoose');

const ProductScheman = new Schema({
    title: String,
    price: Number,
    imgp: String,
    description: String,
});

module.exports = model('Test', ProductScheman);