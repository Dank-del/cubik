import bodyParser from 'body-parser';
import { envConfig } from 'config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import type { Express } from 'express';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import morganBody from 'morgan-body';
import { scheduleJob } from 'node-schedule';
import priceController from 'routes/price';
import { syncCommunity } from 'service/community-sync/syncCommunity';

import logger from './middleware/logger';

const main = async () => {
  config();

  const PORT = envConfig.port || 8000;
  const basePath = '/api/v1';

  const app: Express = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(morgan('combined'));
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
  morganBody(app, {
    noColors: true,
    logResponseBody: false,
  });

  app.get('/', (_req, res) => {
    res.send('Server is running');
  });

  app.use(basePath + '/price/', priceController);

  app.listen(PORT, async () => {
    if (process.env.CRON_ENABLED === '1') {
      logger.log('info', `Adding Sync Community Cron Job, cron interval ${process.env.CRON_INTERVAL}`);
      scheduleJob(process.env.CRON_INTERVAL!, syncCommunity);
    }
    logger.log('info', `Server is running on Port:${PORT}`);
    // await syncCommunity();
  });
};

main()
  .then(() => {
    logger.info('App started');
  })
  .catch((err) => {
    logger.error('App failed');
    logger.error(err.stack);
  });
