import mongoose from 'mongoose';

const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/mernstack';

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log('Database connected');
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error connecting to the database: ${error.message}`);
      throw new Error(`Error connecting to the database: ${error.message}`);
    }
  }

  const connection = mongoose.connection;

  connection.once('open', () => {

  });
};

connectDB();