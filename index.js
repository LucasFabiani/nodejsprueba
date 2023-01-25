const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const port = process.env.PORT || 3000;


const tasks = [];

//app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/players', (req, res) => {
    res.send("Pase una noche loca en Quimili")
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

app.get('/api/print/:data', (req, res) => {
    console.log(req.params.data)
    res.send("enviado!")
});


app.delete('/api/players/:id', (req, res) => {
    const player = players.find(c => c.id === parseInt(req.params.id));
    if (!player) return res.status(404).send("No se encontro el jugador")
    
    const index = players.indexOf(player);
    players.splice(index, 1);
    res.send(player);
});

app.listen(port, () => console.log(`Escuchando puerto: ${port}...`));
