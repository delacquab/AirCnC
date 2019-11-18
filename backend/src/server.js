const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express(); // cria a aplicacao
const server = http.Server(app); // cria servidor
const io = socketio(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack9-c15tm.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connectedUsers = {};

// pega os usuarios conectados
io.on('connection', socket => {
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    // todas as rotas da aplicacao tem acesso a essas variaveis
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})

app.use(cors()); // qq aplicacao possa acessar a api
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333); // ouvi a porta 3333 http://localhost:3333/
