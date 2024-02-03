import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { generateSocketInstance } from './connect/io';

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3000; 

const httpServer = createServer(app);

generateSocketInstance(httpServer);

app.use(cors({
    origin: 'http://localhost:5173' 
}));

app.get('/', (req: Request, res: Response) => {
    res.send({name: 'Express'});
});

httpServer.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});