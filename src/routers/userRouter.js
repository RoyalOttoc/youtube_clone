import express from 'express';
import {
  handledelete,
  see,
  startGithubLogin,
  finishGithubLogin,
  getEdit,
  postEdit,
  logout,
} from '../controllers/userController';
import { protectorMiddleware, publicOnlyMiddleware } from '../middlewares';

const userRouter = express.Router();
userRouter.get('/github/start', publicOnlyMiddleware, startGithubLogin);
userRouter.get('/github/finish', publicOnlyMiddleware, finishGithubLogin);
userRouter.get('/logout', protectorMiddleware, logout);

userRouter.route('/edit').all(protectorMiddleware).get(getEdit).post(postEdit);

userRouter.get('/delete', handledelete);
userRouter.get('/:id(\\d+)', see);

export default userRouter;
