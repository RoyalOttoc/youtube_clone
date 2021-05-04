import express from "express"
import { handleWatch, handleRemove, handleEdit } from "../controllers/videoController"

const videoRouter = express.Router()
videoRouter.get('/:id\\d+', handleWatch)
videoRouter.get('/:id\\d+/remove', handleRemove)
videoRouter.get('/:id\\d+/edit', handleEdit)


export default videoRouter