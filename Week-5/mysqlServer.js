import { createApp } from './app.js';

import { mysqlMovieModel } from './models/mysqlModel.js';

createApp({ movieModel: mysqlMovieModel });
