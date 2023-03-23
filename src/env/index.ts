import 'dotenv/config';

import { z } from 'zod';

const envScheme = z.object({
  DATABASE_URL: z.string(),
  APP_SECRET: z.string(),
  APP_API_URL: z.string(),
  APP_WEB_URL: z.string(),
  MAIL_DRIVER: z.string(),
  STORAGE_DRIVER: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_BUCKET: z.string(),
  AWS_BUCKET_REGION: z.string(),
  AWS_URL: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string(),
  REDIS_PASS: z.string(),
  USER: z.string(),
  USER_TOKEN: z.string(),
  PORT: z.string(),
  PAG_TOKEN: z.string(),
});

export const env = envScheme.parse(process.env);
