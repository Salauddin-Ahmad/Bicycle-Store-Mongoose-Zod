import dotenv from 'dotenv';

import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

// Log to check if environment variables are loaded
// console.log('Loaded PORT:', process.env.PORT);
// console.log('Loaded DATABASE_URL:', process.env.DATABASE_URL);

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};
