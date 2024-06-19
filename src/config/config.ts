import { Configuration } from './config.interface';

const config: Configuration = {
  nest: {
    port: 4000,
  },
  cors: {
    enabled: true,
  },
  security: {
    bcryptSaltOrRound: 10,
    expiresIn: '2m',
    refreshIn: '7d',
  },
};

export default (): Configuration => config;
