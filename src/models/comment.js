const {Schema, model} =require('mongoose');

const CommentScheman = new Schema({
    nombre: String,
    comentario: String,
});

module.exports = model('Comment', CommentScheman);