const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * Ensures strict connection handling before server starts listening
 */
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/weather_dashboard';
    const conn = await mongoose.connect(mongoUri);
    console.log(`[Database] MongoDB Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`[Database Error] Connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
