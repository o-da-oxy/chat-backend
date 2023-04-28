import express from 'express';
import morgan from 'morgan';
import { routes } from './routes/app.router';
import bodyParser from 'body-parser';
import { extendContextWithDb } from './db';
import { Socket } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import {
  getLastMessagesFromRoom,
  getUsers,
  groupMessagesByDate,
} from './socket-functions/socket.functions';
import { IRoom } from './types/entities';
export const prisma = new PrismaClient();
const logger = morgan('dev');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
export const app = express();

app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(logger);
app.use(bodyParser.json());
app.use(extendContextWithDb);
app.use(routes);

// socket connection

const server = require('http').createServer(app);
export const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket: Socket) => {
  socket.on('new-user', async () => {
    const members = await getUsers();
    io.emit('new-user', members);
  });

  socket.on('join-room', async (newRoom, previousRoom) => {
    socket.join(newRoom);
    socket.leave(previousRoom);
    const messages = await getLastMessagesFromRoom(newRoom);
    const roomMessages = await groupMessagesByDate(messages);
    socket.emit('room-messages', roomMessages);
  });

  socket.on(
    'message-room',
    async (
      room: string,
      content: string,
      sender: any,
      time: string,
      date: string
    ) => {
      const newMessage = await prisma.message.create({
        data: {
          content,
          socketId: socket.id,
          date,
          time,
          to: room,
          authorId: sender.id,
        },
      });
      const messages = await getLastMessagesFromRoom(room);
      const roomMessages = await groupMessagesByDate(messages);
      io.to(room).emit('room-messages', roomMessages);
      socket.broadcast.emit('notifications', room);
    }
  );
});

// listen port

server.listen(process.env.PORT, () => {
  console.log(`Server started at port: ${process.env.PORT}`);
});
