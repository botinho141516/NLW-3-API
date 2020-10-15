import { Router } from 'express';
import OrphanageController from './controllers/orphanages';
import multer from 'multer';

import uploadConfig from './config/upload';


const app = Router();
const upload = multer(uploadConfig);

app.post('/orphanages', upload.array('images'), OrphanageController.create);

app.get('/orphanages', OrphanageController.findAll);

app.get('/orphanages/:id', OrphanageController.findOne);



export default app;