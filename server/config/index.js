import 'dotenv/config';

export const config = {
  PORT: parseInt(process.env.PORT, 10) || 5000,
};