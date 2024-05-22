import express from 'express';
import Contact from '../models/contactoModel.js';
const router = express.Router();

router.put("/actualizar/:id",async (req,res) => {
    const contacto = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(contacto);
});

router.delete("/eliminar/:id",async (req,res) => {
    //console.log(req.params.id);
    const contacto = await Contact.findByIdAndDelete(req.params.id);
    if (!contacto) {
        res.status(404).json({ message: "Contacto no encontrado" });
    } else {
        res.json({"id": contacto.id})
    }
});

router.get("/mostrar", async (req,res) => {
    const contactos = await Contact.find();
    res.json(contactos);
});

router.post('/nuevoContacto', async (req, res) => {
    const contacto = new Contact({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    try {
      const newContacto = await contacto.save();
      res.status(201).json(newContacto);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

export default router;