import express from 'express';
import {
  see,
  startGithubLogin,
  finishGithubLogin,
  getEdit,
  postEdit,
  logout,
  getChangePassword,
  postChangePassword,
} from '../controllers/userController';
import { avatarUpload, protectorMiddleware, publicOnlyMiddleware } from '../middlewares';

const userRouter = express.Router();
userRouter.get('/github/start', publicOnlyMiddleware, startGithubLogin);
userRouter.get('/github/finish', publicOnlyMiddleware, finishGithubLogin);
userRouter.get('/logout', protectorMiddleware, logout);
userRouter.route('/edit').all(protectorMiddleware).get(getEdit).post(avatarUpload.single('avatar'), postEdit);
userRouter.route('/change-password').all(protectorMiddleware).get(getChangePassword).post(postChangePassword);

userRouter.get('/:id', see);

export default userRouter;
