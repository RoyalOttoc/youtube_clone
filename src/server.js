import express from "express";

const app = express();
const PORT = 4000;

const handleListening = () => {
    console.log(`✅ Server listening to http://localhost:${PORT}`)
}

app.listen(PORT, handleListening)

app.get('/', (req, res) => {
    res.send('Hello World!')
})