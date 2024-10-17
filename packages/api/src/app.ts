import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

import { ExpressAuth } from '@auth/express';
import * as middlewares from './middlewares.js';
import { authConfig } from './config/auth.js';
import { limiter } from './lib/limiter.js';
import { api } from './api/index.js';

import 'dotenv/config';

const app = express();

// https://express-rate-limit.mintlify.app/guides/troubleshooting-proxy-issues
app.set('trust proxy', 1);

app.use(morgan('dev'));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(middlewares.currentSession);

app.use('/api/auth/*', limiter, ExpressAuth(authConfig));
app.use('/api/v1/user', api.userRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
