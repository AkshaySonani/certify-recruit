import { resetDailyData } from '@/service/ReSchedul';
import cron from 'node-cron';

const task = cron.schedule('0 0 * * *', async () => {
  try {
    console.log('Scheduled task running...');
    await resetDailyData();
    console.log('Scheduled task completed.');
  } catch (error) {
    console.error('Error running scheduled task:', error);
  }
});

console.log('Scheduled task to run at midnight');

// // Start the cron job
// task.start();

// export default task;
