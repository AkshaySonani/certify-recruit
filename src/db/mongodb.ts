import '../config/scheduler';
import mongoose from 'mongoose';

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected');
    });

    mongoose.connection.on('error', (err) => {
      console.log('MongoDB error' + err);
      process.exit();
    });
  } catch (error: any) {
    console.log(error);
  }
}
