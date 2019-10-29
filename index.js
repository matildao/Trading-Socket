const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const stock = require("./stock.js");
const requestApi = require("./request");
const favicon = require('serve-favicon');
const express = require('express');
require('dotenv').config()

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.static('public'));

const pokemons = [
    { id: 1, title: "Pikachu", startingPrice: 2.0760217116660116e+41, rate: 1.001, variance: 0.4 },
    { id: 2, title: "Mewto", startingPrice: 1.8941496032743813e+197, rate: 1.005, variance: 0.2 },
    { id: 3, title: "Pidgey", startingPrice: 1.7024751421594246e+71, rate: 1.002, variance: 0.9 },
    { id: 4, title: "Charizard", startingPrice: null, rate: 1.008, variance: 0.1 },
    { id: 5, title: "Blastoise", startingPrice: 1.1088955089410167e+120, rate: 1.003, variance: 0.5 }
];


// requestApi.GetAllProducts(function (res) {
// const pokemons = JSON.parse(res).data;

console.log("Server listening");

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

setInterval(function () {
    pokemons.map((pokemon) => {
        pokemon["startingPrice"] = stock.getStockPrice(pokemon);
        return pokemon;
    });

    io.emit("stocks", pokemons);
}, 5000);
// });

http.listen(8300, function () {
    console.log('Trading-prices socket server listening on *:8300');
});
