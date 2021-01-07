
import * as express from 'express';
import { getFilms, saveFilm } from '@controllers/film.controller';

const router = express.Router({ mergeParams: true });

router.post('/', saveFilm);
router.get('/', getFilms)

export { router };
