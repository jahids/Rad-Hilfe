import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { router } from './routers/router';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: __dirname + '/.env' });
// dotenv.config();

const app: Application = express();

const corsConfig = {
	origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://192.168.68.60:5173/'],
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());
app.use(router);

try {
	mongoose.connection.on('open', () => console.log('🍁 Connected to Database'));

	app.listen(process.env.SERVER_PORT, () => {
		console.log(`🚀 Server is listening on port http://localhost:${process.env.SERVER_PORT}`);
	});
} catch (error) {
	console.log(error);
}
