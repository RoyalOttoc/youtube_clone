import express from 'express';
import { watch, deleteVideo, getEdit, postEdit, upload } from '../controllers/videoController';

const videoRouter = express.Router();
videoRouter.get('/:id(\\d+)', watch);
videoRouter.route('/:id(\\d+)/edit').get(getEdit).post(postEdit);

videoRouter.get('/upload', upload);
videoRouter.get('/:id(\\d+)/delete', deleteVideo);

export default videoRouter;
