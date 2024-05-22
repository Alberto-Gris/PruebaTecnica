import mongoose from 'mongoose';

const dbconnect = async () => {
    try {
      await mongoose.connect('mongodb://127.0.0.1/prueba', {});
      console.log('Base de datos conectada');
    } catch (error) {
      console.error('No se conecto a la base de datos', error);
    }
  };

export default dbconnect;