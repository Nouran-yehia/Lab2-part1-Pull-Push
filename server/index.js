const app = require (`express`)();
const cors = require('cors')
const socket = require('socket.io');
const server = require('http').Server(app)
app.use(cors());

const io = socket(server) 

io.on('connection',(client)=> {
    client.on('message',(message, uname)=> {
        console.log(message)
        io.emit('new-message', message, uname);
    });
  });

if (server.listen(3000))
console.log("listening to port 3000 \n http://localhost:3000")