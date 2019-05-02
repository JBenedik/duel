const mongoose = require('mongoose');

const CharSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Need a name to play!'], minlength: [2, "Name must be two characters long!"]},
    race: {type: String, required: [true, 'Need a race to play!']},
    job: {type: String, required: [true, 'Gotta be something!']},
    sex: {type: String, required: [true, 'Gotta have a gender!']},
    health: {type: Number},
    stats: 
        {
            hp: {type: Number},
            str: {type: Number},
            int: {type: Number},
            dex: {type: Number},
            char: {type: Number},
            def: {type: Number},
            luck: {type: Number}
        },
    gold: {type: Number},
    items: [
        {
            name: String,
            desc: String,
            stat: String
        }
    ],
    moves: [
        {
            name: String,
            desc: String,
            self: Boolean,
            cd: Number,
            mod: {type: Number, default: 0}
        }
    ],
    rating: {type: Number},
    img: {type: String, default:'../../assets/img/dickbutt.jpg'}
}, {timestamps: true});

mongoose.model('Char', CharSchema);