import mongoose from 'mongoose';

const URI = process.env.MONGODB_URI? process.env.MONGODB_URI : 'mongodb://localhost/mernstack';
console.log("process env", process.env.MONGODB_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log('DB is connected', URI);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }

  const connection = mongoose.connection;

  connection.once('open', () => {
    console.log('Connection established successfully');
  });
};

connectDB();