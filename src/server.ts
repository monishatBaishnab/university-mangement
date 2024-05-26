import { Server } from 'http';
import app from './app';
import config from './app/config';

let server: Server;

const bootstrap = async () => {
  server = app.listen(config.port, () => {
    console.log(`Server is running on port: ${config.port}`);
  });
};

bootstrap();
