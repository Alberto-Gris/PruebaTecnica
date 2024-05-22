import express from 'express';
const router = express.Router();

import User from '../models/usuarioModel.js';

router.put("/actualizar/:id",async (req,res) => {
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(user);
});

router.delete("/eliminar/:id",async (req,res) => {
    //console.log(req.params.id);
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        res.status(404).json({ message: "Usuario no encontrado" });
    } else {
        res.json({"id": user.id})
    }
});

router.get("/mostrar", async (req,res) => {
    const users = await User.find();
    res.json(users);
});

router.post('/nuevoUsuario', async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

export default router;