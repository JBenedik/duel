const Char = require('./../controllers/chars');
const Duel = require('./../controllers/duels');

module.exports = (app) => {
    app.post('/char/new', Char.create)
    app.get('/char/login/:id', Char.login)
    app.post('/duel/new', Duel.create)
    app.get('/duel/all', Duel.all)
    app.put('/duel/join', Duel.join)
    app.get('/duel/:id', Duel.info)
    app.put('/char/results', Char.results)
}