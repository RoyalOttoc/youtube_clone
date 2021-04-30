import express from "express";

const app = express();
const PORT = 4000;

const handleHome = (req, res) => res.send("Home")
const handleLogin = (req, res) => res.send("Login")

app.get('/', handleHome)
app.get('/login', handleLogin)

const handleListening = () => {
    console.log(`✅ Server listening to http://localhost:${PORT} 🚀`)
}
app.listen(PORT, handleListening)

