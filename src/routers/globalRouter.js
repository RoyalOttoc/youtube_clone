import express from 'express';
import { getJoin, postJoin, getLogin, logout, postLogin } from '../controllers/userController';
import { search, home } from '../controllers/videoController';

const globalRouter = express.Router();
globalRouter.get('/', home);
globalRouter.route('/join').get(getJoin).post(postJoin);
globalRouter.route('/login').get(getLogin).post(postLogin);
globalRouter.get('/search', search);
globalRouter.get('/logout', logout);
globalRouter.get('/search', search);

export default globalRouter;
