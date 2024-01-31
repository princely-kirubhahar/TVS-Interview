const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: String,
    age: Number,
    gender: String
}
);

module.exports = mongoose.model('Data',schema);
