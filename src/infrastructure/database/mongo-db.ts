import mongoose from 'mongoose';

export async function connectToDatabase() {
  try {
    const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database';
    await mongoose.connect(connectionString);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}