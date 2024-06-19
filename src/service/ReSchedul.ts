import { Individual } from '@/models';

export async function resetDailyData() {
  try {
    await Individual.updateMany(
      {},
      {
        $set: {
          'learn_and_earn.result': 0,
          'learn_and_earn.end_time': '',
          'learn_and_earn.join_time': '',
          'learn_and_earn.register': false,
          'learn_and_earn.registration_time': '',
        },
      },
    );
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to update learn and earn defaults');
  }
}
