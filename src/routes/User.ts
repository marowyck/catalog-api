import express, { Router } from 'express';
import { createUser, readUser, readAllUsers, deleteUser } from '../controllers/User';

const router: Router = express.Router();

router.post('/create', createUser as unknown as express.RequestHandler);
router.get('/get/:userId', readUser as unknown as express.RequestHandler);
router.get('/get', readAllUsers as unknown as express.RequestHandler);
router.delete('/delete/:userId', deleteUser as unknown as express.RequestHandler);

export default router;
