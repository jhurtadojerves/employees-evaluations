const env = process.env.ENV || 'local';

export interface AppConfig {
  server: {
    port: number;
  };
  db: {
    url: string;
  };
  secrets: {
    jwt: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-require-imports
const config = require(`./${env.toLowerCase()}`).default as AppConfig;
export default config;
