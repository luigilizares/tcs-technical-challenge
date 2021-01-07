import axios from 'axios';
import { filmType } from '@models/film';


const SWAPI_URL_FIMLS = 'https://swapi.py4e.com/api/films/';

const traducedAttributes = {
  title: 'titulo',
  episode_id: 'id',
  opening_crawl: 'resumen',
  director: 'director',
  producer: 'productor',
  release_date: 'fecha_lanzamiento',
}


export const getFilmsFromSwapiApi = async () => {
  const response = await axios.get(SWAPI_URL_FIMLS);
  const films = response.data.results;
  const mappedFilms: filmType[] = films.map(film => {
    const mappedFilm = Object.keys(film).reduce((object, key) => {
      const newKey = traducedAttributes[key];
      if (newKey) {
        object[newKey] = film[key];
      }
      return object
    }, {});

    return mappedFilm;
  })

  return mappedFilms;
}

