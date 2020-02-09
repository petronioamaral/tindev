const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
  const { user } = socket.handshake.query;
  connectedUsers[user] = socket.id;

  console.log(user, socket.id);

/*   console.log('Nova conexao', socket.id);

  socket.on('hello', message => {
    console.log(message)
  })


  setTimeout(() => {
  socket.emit('world', {
    message: 'PetronioAmaral'
  });
}, 5000);
 */

});



mongoose.connect(
  "mongodb+srv://toqueweb:toqueweb@cluster0-fhmen.mongodb.net/toqueweb?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
