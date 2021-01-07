import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as cors from 'cors';
import { eventContext } from 'aws-serverless-express/middleware';
import { router } from './routes';

export function configureApp() {
  const app = express();
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(eventContext());
  app.use("/films", router);

  return app;
}
