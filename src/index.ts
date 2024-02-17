import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { generateSocketInstance } from './connect/io';
import path from 'path';

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3000; 

const httpServer = createServer(app);

generateSocketInstance(httpServer);

app.use(cors({
    origin: 'http://localhost:5173' 
}));

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

httpServer.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});