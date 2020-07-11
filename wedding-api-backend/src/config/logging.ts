import * as bunyan from 'bunyan';

const logger = bunyan.createLogger({
  name: 'my-service',
  streams: [
    {stream: process.stdout, level: 'info'}
  ],
});

export const customLogger = process.env.LOG_DEBUG ?
(action, metadata) => console.warn(JSON.stringify({ action, metadata }, null, 1)) :
(action, metadata) => logger.info({ labels: { action }, metadata });
