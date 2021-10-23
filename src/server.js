import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import pug from 'pug';
import { localsMiddleware } from './middlewares';

const app = express();
const logger = morgan('dev');

app.set('views', process.cwd() + '/src/views');
app.set('view engine', 'pug');
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'Hello!',
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(localsMiddleware);

app.use('/', globalRouter);
app.use('/users', userRouter);
app.use('/videos', videoRouter);

export default app;
