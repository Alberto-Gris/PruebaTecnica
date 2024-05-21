import express from 'express';

const app = express();

app.get("/",(rq,res) => {
    res.send("Probando...");
});

app.listen(3000,() => {
    console.log("Server listening on port 3000");
});