const mongoose = require('mongoose');
const Duel = mongoose.model('Duel');

module.exports = {
    create: (req, res) => {
        console.log("create duel route")
        console.log(req.body);
        const duel = new Duel(req.body);
        console.log(duel);
        duel.save((err) => {
            if(err) {
                res.json({status:false, error:err})
            }
            else {
                res.json({status: true, duel: duel})
            }
        })
    },
    all: (req, res) => {
        console.log("get all duels in route")
        Duel.find({}, (err, duels)=> {
            if(err){
                res.json({status: false, error:err});
            }
            else {
                res.json({status: true, duels: duels});
            }
        })
    },
    join: (req, res) => {
        console.log("Attempting to join duel")
        console.log(req.body)
        Duel.findOne({_id:req.body.duel._id}, (err, duel)=> {
            if(err){
                res.json({status:false, error:err});
            }
            else {
                console.log("Found the duel");
                console.log(duel);
                if(duel.opponent['name']){
                    console.log("Duel has two players");
                    res.json({status: true, duel:duel});
                }
                duel.opponent = [];
                duel.opponent.push(req.body.hero);
                duel.full = true;
                duel.save((err) => {
                    if(err){
                        console.log("something fucked up");
                        res.json({status: false, error: err});
                    }
                    else{
                        console.log("added opponent to duel");
                        res.json({status: true, duel:duel});
                    }
                })
            }
        })
    },
    info: (req, res) => {
        console.log("Getting duel info");
        console.log(req.params.id);
        Duel.findOne({_id:req.params.id}, (err, duel)=> {
            if(err){
                res.json({status: false, error:err});
            }
            else {
                res.json({status: true, duel:duel});
            }
        })
    }
    
}