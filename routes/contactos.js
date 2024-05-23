import express from 'express';
import Contact from '../models/contactoModel.js';
import User from '../models/usuarioModel.js';
const router = express.Router();

router.put("/actualizar/:id",async (req,res) => {
    const contacto = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(contacto);
});

router.delete("/eliminar/:id",async (req,res) => {
    //console.log(req.params.id);
    try{
    const contacto = await Contact.findById(req.params.id);
    if (!contacto) {
        res.status(404).json({ message: "Contacto no encontrado" });
    }
    await Contact.findByIdAndDelete(req.params.id);

    await User.findByIdAndUpdate(contacto.id_Usuario, { $pull: { contacts: req.params.id } });
    res.status(200).json({"message": "Eliminado con éxito"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/mostrar", async (req,res) => {
    const contactos = await Contact.find();
    //const contacts = await Contact.find().populate('user');
    res.json(contactos);
});

router.post('/nuevoContacto', async (req, res) => {
    const contacto = new Contact({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      id_Usuario: req.body.id_Usuario
    });

    try {
      const newContacto = await contacto.save();
      await User.findByIdAndUpdate(req.body.id_Usuario, { $push: { contacts: newContacto.id } });
      res.status(200).json(newContacto);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
});

export default router;