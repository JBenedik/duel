const mongoose = require('mongoose');
const Char = mongoose.model('Char');

module.exports = {
    create: (req, res) => {
        console.log("create char route")
        console.log(req.body);
        const hero = new Char(req.body);
        console.log(hero);
        console.log(hero._id);
        req.session.id = hero._id;
        console.log(req.session.id);
        hero.save((err) => {
            if(err) {
                res.json({status:false, error:err})
            }
            else {
                res.json({status: true, char: hero})
            }
        })
    },

    login: (req, res) => {
        console.log("Login route");
        const charId = req.params.id;
        Char.findOne({_id:charId}, (err, char)=> {
            if(err){
                res.json({status:false, error:err});
            }
            else {
                res.json({status:true, char: char});
            }
        })
    },

    results: (req, res) => {
        console.log("Results route");
        const char = req.body.char;
        const oppo = req.body.char;
        Char.findOne({_id: char._id}, (err, char) => {
            if(err){
                console.log("Getting Char fucked up");
            }
            else {
                console.log(char)
                Char.findOne({_id: oppo._id}, (err, oppo) => {
                    if(err) {
                        console.log("Getting Oppo fucked up");
                    }
                    else {
                        console.log(oppo);
                        char.rating = req.body.char.rating;
                        oppo.rating = req.body.oppo.rating;
                        char.gold = req.body.char.gold;
                        oppo.gold = req.body.oppo.gold;
                        console.log("Updated info:")
                        console.log(char);
                        console.log(oppo);
                        char.save((err) => {
                            if(err){
                                console.log("Couldn't save char");
                                res.json({status: false, error: err});
                            }
                            else{
                                console.log("Char saved");
                            }
                        oppo.save((err) => {
                            if(err){
                                console.log("Coudln't save oppo");
                                res.json({status: false, error: err});
                            }
                            else {
                                console.log("Updated both fighters");
                                res.json({status: true, char:char});
                            }
                        })
                        })
                    }
                })
            }
        })
    }
}
