import express from 'express';
import {
  handledelete,
  see,
  startGithubLogin,
  finishGithubLogin,
  getEdit,
  postEdit,
  logout,
  getChangePassword,
  postChangePassword,
} from '../controllers/userController';
import { protectorMiddleware, publicOnlyMiddleware, uploadFiles } from '../middlewares';

const userRouter = express.Router();
userRouter.get('/github/start', publicOnlyMiddleware, startGithubLogin);
userRouter.get('/github/finish', publicOnlyMiddleware, finishGithubLogin);
userRouter.get('/logout', protectorMiddleware, logout);
userRouter.route('/edit').all(protectorMiddleware).get(getEdit).post(uploadFiles.single('avatar'), postEdit);
userRouter.route('/change-password').all(protectorMiddleware).get(getChangePassword).post(postChangePassword);

userRouter.get('/delete', handledelete);
userRouter.get('/:id(\\d+)', see);

export default userRouter;
