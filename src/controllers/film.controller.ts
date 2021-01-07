import { Request, Response } from "express";
import * as uuid from "uuid";
import { filmType } from "@models/film";
import { validateSchema } from "@validations/film.validation";
import { dynamoDB } from "@config/dynamoConnection";
import { getFilmsFromSwapiApi } from "src/services/swapi.service";

export const saveFilm = async (req: Request, res: Response) => {
  try {
    await validateSchema(req.body as filmType);

    const { titulo, resumen, fecha_lanzamiento, productor, director } = req.body;

    const params = {
      TableName: process.env.DYNAMO_TABLE,
      Item: {
        id: uuid.v1(),
        titulo,
        resumen,
        fecha_lanzamiento,
        productor,
        director
      }
    }

    await dynamoDB.put(params).promise();

    return res.status(200).json({
      message: "Film saved sucessfully",
      film: params.Item,
    });

  } catch (err) {

    return res.status(400).json({
      error: err,
    });
  }
}


export const getFilms = async (req: Request, res: Response) => {
  const swapiApiFilms = await getFilmsFromSwapiApi();

  try {
    const params = {
      TableName: process.env.DYNAMO_TABLE,
    }

    const data = await dynamoDB.scan(params).promise();

    return res.status(200).json({
      films: [...swapiApiFilms, ...data.Items],
    });

  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  };
}
