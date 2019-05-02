const mongoose = require('mongoose');
var CharSchema = require('mongoose').model('Char').schema

const DuelSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Need a duel name!'], minlength: [3, 'Name must be at least three characters!']},
    private: {type: Boolean, default: 'false'},
    password: {type: String},
    wager: {type: Number, required: [true, 'Must wager something!'], min: [0, "Don't be coy."]},
    creator: [CharSchema],
    opponent: [CharSchema],
    win: {type: String},
    lost: {type: String},
    full: {type: Boolean, default: 'false'}
}, {timestamps: true})

mongoose.model('Duel', DuelSchema);