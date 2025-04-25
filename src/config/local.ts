import { AppConfig } from './index';

export default {
  server: {
    port: parseInt(process.env.PORT || '9000'),
    env: process.env.ENV || 'local',
  },
  db: {
    url: process.env.DB || 'mongodb://localhost:27017/evaluations',
  },
  secrets: {
    jwt: process.env.JWT_SECRET || 'your_secret_key',
    jwtDuration: process.env.JWT_DURATION,
  },
} as AppConfig;
