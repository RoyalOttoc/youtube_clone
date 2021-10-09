import express from 'express';
import { handleEdit, handledelete, see } from '../controllers/userController';

const userRouter = express.Router();
userRouter.get('/edit', handleEdit);
userRouter.get('/delete', handledelete);
userRouter.get('/:id(\\d+)', see);

export default userRouter;
