import mongoose from 'mongoose';

const dbconnect = async () => {
    try {
      await mongoose.connect('mongodb://admin:arenita*55@18.219.170.235:27017/', {});
      console.log('Base de datos conectada');
    } catch (error) {
      console.error('No se conecto a la base de datos', error);
    }
  };

export default dbconnect;