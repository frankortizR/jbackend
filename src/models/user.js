const {Schema, model} =require('mongoose');
const bcrypt = require('bcryptjs');

const UserScheman = new Schema({
    username: String,
    password: String
});

UserScheman.methods.encryptPas = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

UserScheman.methods.validPas = function (password) {
    return bcrypt.compare(password, this.password);
}

module.exports = model('User', UserScheman);