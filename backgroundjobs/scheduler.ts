import cron from 'node-cron';
import { AppDataSource } from '../src/data-source';
import {Users} from '../src/entity/User'

AppDataSource.initialize().then(() => {
  console.log('Cron Job: Database connected');

  cron.schedule('*/1 * * * *', async () => {
    console.log('Fetching admin users...');

    try {
      const employeeRepo = AppDataSource.getRepository(Users);
      const admin = await employeeRepo.find({ where: { role: 'admin' } });

      if (admin.length > 0) {
        console.log(`Found ${admin.length} admin(s):`);
        admin.forEach(admin => {
          console.log(`- ${admin.name} (${admin.email})`);
        });
      } else {
        console.log('No admin users found.');
      }
    } catch (error) {
      console.error('Error in cron job:', error);
    }
  });

  console.log('cron job initialized.');
}).catch(error => console.error('Error connecting to database:', error));
