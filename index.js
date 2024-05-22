import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRoute from './routes/usuarios.js';
import contactRoute from './routes/contactos.js';
import dbconnect from './database.js';

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use('/usuarios', userRoute);
app.use('/contactos', contactRoute);

dbconnect();

app.listen(3000,() => {
    console.log("Server listening on port 3000");
});