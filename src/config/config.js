import dotenv from 'dotenv';
dotenv.config();

export const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'default-access-secret',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'default-refresh-secret',
};
