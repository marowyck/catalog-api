import express from 'express';
import { RequestHandler } from 'express';
import * as controller from '../controllers/Catalog';

const router = express.Router();

router.post('/create', controller.createCatalog as unknown as RequestHandler);
router.get('/get/:catalogId', controller.readCatalog as unknown as RequestHandler);
router.get('/get', controller.readAll as unknown as RequestHandler);
router.patch('/update/:catalogId', controller.updateCatalog as RequestHandler);
router.delete('/delete/:catalogId', controller.deleteCatalog as unknown as RequestHandler);

export default router;
