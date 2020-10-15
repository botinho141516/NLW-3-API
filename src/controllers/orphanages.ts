import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Orphanages from "../models/orphanages";
import orphanageView from "../views/orphanages_views";
import * as Yup from 'yup';

export default {
  create: async (req: Request, res: Response) => {
    const {
      about,
      instructions,
      latitude,
      longitude,
      name,
      open_on_weekends,
      opening_hours
    }: Orphanages = req.body;

    const orphanagesRepository = getRepository(Orphanages);

    const requestImages = req.files as Express.Multer.File[];
    const images = requestImages.map(({ filename }) => ({ path: filename }))

    const data = {
      about,
      instructions,
      latitude,
      longitude,
      name,
      open_on_weekends,
      opening_hours,
      images
    };

    console.log
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      opening_hours: Yup.string().required(),
      instructions: Yup.string().required(),
      open_on_weekends: Yup.string().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    })

    await schema.validate(data, {
      abortEarly: false
    });

    const newOrphanage = orphanagesRepository.create(data);

    const createdOrphanages = await orphanagesRepository.save(newOrphanage);

    return res.status(201).json(createdOrphanages);

  },
  findAll: async (req: Request, res: Response) => {

    const orphanages = await getRepository(Orphanages).find({ relations: ['images'] });
    return res.status(200).json(orphanageView.renderMany(orphanages));
  },
  findOne: async (req: Request, res: Response) => {
    const { id } = req.params;

    const orphanage = await getRepository(Orphanages).findOneOrFail(id, {
      relations: ['images']
    });

    return res.status(200).json(orphanageView.render(orphanage));

  }
}
