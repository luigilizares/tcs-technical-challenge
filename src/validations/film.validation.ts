import * as yup from 'yup';
import { filmType } from '@models/film';

const schema = yup.object().shape({
  titulo: yup.string().required(),
  resumen: yup.string().required(),
  director: yup.string().required(),
  productor: yup.string().required(),
  fecha_lanzamiento: yup.string(),
});



export const validateSchema = (values: filmType) => schema
  .validate(values)
