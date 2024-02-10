import { IncomingMessage, ServerResponse } from 'http';
import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { ClientToServerEvents, ISocketData, InterServerEvents, ServerToClientEvents } from '../../schema/socket';
import { SocketQueue } from './SocketQueue';

type AppSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, ISocketData>
type SocketFunc = (s: AppSocket) => void

const userQueue = new SocketQueue<AppSocket>([]);
const connectesClient: {
    [key: string]: AppSocket
} = {};
export const generateSocketInstance = (httpServer: HttpServer<typeof IncomingMessage, typeof ServerResponse>) => {
    const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    ISocketData>(httpServer, {
        cors: {
            origin: '*',
        }
    });
    io.on('connection', (socket) => {
        console.log(`Socket connected with id ${socket.id}`);
        requestJoin(socket);
        onMessage(socket);
        onDisconnect(socket);
    });
    return io;
};


const exchangeUserData = (u1: AppSocket, u2: AppSocket) => {
    u1.data.recipientUserName = u2.data.userName;
    u1.data.recipientId = u2.id;

    u2.data.recipientUserName = u1.data.userName;
    u2.data.recipientId = u1.id;

    u1.data.isCaller = false;
    u2.data.isCaller = true;
};
const requestJoin: SocketFunc= (socket) => {
    socket.on('requestJoin', (data) => {
        socket.data.userName = data.userName;
        if(!userQueue.isEmpty()){
            const recp = userQueue.dequeue();
            if(recp){
                exchangeUserData(socket, recp);
                connectesClient[socket.id] = socket;
                connectesClient[recp.id] = recp;
                socket.emit('userJoin', {
                    name: recp.data.userName,
                    isCaller: recp.data.isCaller
                });
                recp.emit('userJoin', {
                    name: socket.data.userName,
                    isCaller: socket.data.isCaller
                });
            }
        }else{
            userQueue.enqueue(socket);
        }
    });
};

const onMessage: SocketFunc = (socket) => {
    socket.on('message', (data) => {
        if(data.messageType === 'chat'
        && data.content.contentType === 'text'){
            if(socket.data.recipientId){
                data.content.messageData.isSelf = false,
                socket.to(socket.data.recipientId).emit('onMessage', {
                    ...data,
                });
            }
        }
    });
};

const onDisconnect: SocketFunc = (socket) => {
    socket.on('disconnect', (reason) => {
        if(socket.data.recipientId){
            socket.to(socket.data.recipientId).emit('userLeave', reason);
            const recp = connectesClient[socket.data.recipientId];
            recp.data.recipientId = undefined;
            recp.data.recipientUserName = undefined;
            delete connectesClient[socket.id];
        }
    });
    socket.on('requestLeave', () => {
        if(socket.data.recipientId){
            socket.to(socket.data.recipientId).emit('userLeave', null);
            const recp = connectesClient[socket.data.recipientId];
            recp.data.recipientId = undefined;
            recp.data.recipientUserName = undefined;
        }
    });
};