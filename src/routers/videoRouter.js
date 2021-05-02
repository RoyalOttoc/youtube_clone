import express from "express"
import { handleWatch, handleRemove } from "../controllers/videoController"

const videoRouter = express.Router()
videoRouter.get('/watch', handleWatch)
videoRouter.get('/remove', handleRemove)

export default videoRouter