import { createServer } from 'http';
import { Server } from 'socket.io';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

let rooms = []; //[{name:String, leader:String, members:[String], creationTime:Int, history:[{action, videoTime, time}]}]

io.on('connection', client => {
    console.log('New User Connected');

    client.on('registerUser', (data) => {
        const { username, roomName } = data;
        client.join(roomName)
        const found = rooms.find(room => { return room.name === roomName });
        if (found === undefined) {
            const newRoom = {
                name: roomName, leader: client.id, members: Array(username),
                creationTime: Date.now(), history: []
            };
            rooms.push(newRoom);
            io.to(roomName).emit('updateRoomInfo', { roomInfo: newRoom });
        }
        else {
            found.members.push(username);
            io.to(roomName).emit('updateRoomInfo', { roomInfo: found });
        }
    })

    client.on('videoChange', data => {
        const { leader, roomName, action, time } = data;
        if (client.id === leader) {
            const found = rooms.find(room => { return room.name === roomName });
            if (found !== undefined) {
                if (action !== 'SEEK') {
                    found.history.push({ action, videoTime: time, time: Date.now() - found.creationTime });
                    io.to(roomName).emit('updateRoomInfo', { roomInfo: found });
                }
                client.to(roomName).emit('updateVideo', { action, time });
            }
        }
    })
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})