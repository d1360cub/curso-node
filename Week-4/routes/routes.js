import { Router } from 'express';
import { movieController } from '../controllers/controllers.js';

export const moviesRouter = Router();

moviesRouter.get('/', movieController.getAll);
moviesRouter.get('/:id', movieController.getById);
moviesRouter.get('/search/query', movieController.getBySearch);
moviesRouter.post('/', movieController.create);
moviesRouter.delete('/:id', movieController.delete);
moviesRouter.patch('/:id', movieController.update);
