import express, { Request, Response, NextFunction } from 'express';

const app = express();
const port = 3000;

import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';

import route from './routes/index.routes';
import syncDatabase from './models/sync';


syncDatabase();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from TypeScript + Express!');
});

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../src')));

route(app);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Lỗi server',
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
