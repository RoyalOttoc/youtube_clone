import express from "express";
import morgan from "morgan"

const app = express();
const logger = morgan("dev")

const PORT = 4000;

const handleHome = (req, res) => res.send("Home")
const handleLogin = (req, res) => res.send("Login")

app.use(logger)
app.get('/', handleHome)
app.get('/login', handleLogin)

const handleListening = () => {
    console.log(`✅ Server listening to http://localhost:${PORT} 🚀`)
}
app.listen(PORT, handleListening)

