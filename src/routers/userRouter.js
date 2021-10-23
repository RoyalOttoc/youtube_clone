import express from 'express';
import { handleEdit, handledelete, see, startGithubLogin, finishGithubLogin } from '../controllers/userController';

const userRouter = express.Router();
userRouter.get('/github/start', startGithubLogin);
userRouter.get('/github/finish', finishGithubLogin);

userRouter.get('/edit', handleEdit);
userRouter.get('/delete', handledelete);
userRouter.get('/:id(\\d+)', see);

export default userRouter;
