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

requestApi.GetAllProducts(function (res) {
    const pokemons = JSON.parse(res).data;
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
});

http.listen(8300, function () {
    console.log('Trading-prices socket server listening on *:8300');
});
