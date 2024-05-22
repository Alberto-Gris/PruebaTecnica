import express from 'express';
const router = express.Router();

import User from '../models/usuarioModel.js';

router.get("/", async (req,res) => {
    const users = await User.find();
    res.json(users);
});

router.post('/nuevoUsuario', async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    });
  
    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

export default router;