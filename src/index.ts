import express from 'express';
import morgan from 'morgan';
import { routes } from './routes/app.router';
// eslint-disable-next-line node/no-extraneous-import
import bodyParser from 'body-parser';
import { extendContextWithDb } from './db';
const logger = morgan('dev');
const helmet = require('helmet');

require('dotenv').config();

const app = express();

app.use(helmet());
app.use(logger);
app.use(bodyParser.json());
app.use(extendContextWithDb); //глобально положить бд в контекст

app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Server started at port: ${process.env.PORT}`);
});
