import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'https';
import { generateSocketInstance } from './connect/io';
import path from 'path';
import { readFileSync } from 'fs';

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3000; 

console.log(path.join(__dirname, '../cert', 'key.pem'));
const httpServer = createServer({
    key: readFileSync(path.join(__dirname, '../cert', 'key.pem')),
    cert: readFileSync(path.join(__dirname, '../cert', 'cert.pem'))
},app);

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