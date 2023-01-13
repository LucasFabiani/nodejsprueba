const express = require('express');
const app = express();
const port = process.env.PORT || 80;

app.use(express.json());

const players = [
    {id: 1, name: "Player1234", level: 23, admin: false},
    {id: 2, name: "Lucas Pro", level: 93, admin: true},
    {id: 3, name: "FrancoGamer", level: 12, admin: false},

];

app.get('/', (req, res) => {
    res.send("Busca tu jugador:")
});

app.get('/api/players', (req, res) => {
    res.send(players)
});

app.get('/api/players/:id', (req, res) => {
    const player = players.find(c => c.id === parseInt(req.params.id));
    if (!player) return res.status(404).send("No se encontro el jugador")
    res.send(player)
});


app.post('/api/players', (req, res) => {
    const player = {
        id: players.length + 1,
        name: req.body.name,
        level: parseInt(req.body.level),
        admin: false
    }

    players.push(player);
    res.send(player);
});


app.delete('/api/players/:id', (req, res) => {
    const player = players.find(c => c.id === parseInt(req.params.id));
    if (!player) return res.status(404).send("No se encontro el jugador")
    
    const index = players.indexOf(player);
    players.splice(index, 1);
    res.send(player);
});

app.listen(port, () => console.log(`Escuchando puerto: ${port}...`));