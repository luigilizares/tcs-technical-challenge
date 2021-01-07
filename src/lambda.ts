import 'source-map-support/register';
import { createServer, proxy } from 'aws-serverless-express';
import { Context } from 'aws-lambda';
import { configureApp } from './app';

const app = configureApp();
const server = createServer(app);

export const http = (event: any, context: Context) =>
  proxy(server, event, context);
