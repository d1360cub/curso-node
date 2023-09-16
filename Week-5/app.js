import express, { json } from 'express'; // import ESmodules
import { createMovieRouter } from './routes/routes.js';
import { corsMiddleware } from './middlewares/cors.js';

export const createApp = ({ movieModel }) => {
  const app = express();

  app.use(corsMiddleware());
  app.use(json());

  app.disable('x-powered-by');

  app.use('/movies', createMovieRouter({ movieModel }));

  const PORT = process.env.PORT ?? 1234;

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
  });
};
