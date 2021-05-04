import express from "express"
import { handleHome, join, login } from "../controllers/userController"
import { search } from "../controllers/videoController"

const globalRouter = express.Router();
globalRouter.get('/', handleHome);
globalRouter.get('/join', join);
globalRouter.get('/login', login);
globalRouter.get('/search', search);


export default globalRouter;