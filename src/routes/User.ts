import express from 'express';
import { createUser, readUser, readAllUsers, deleteUser, loginUser } from '../controllers/User';

const router = express.Router();

router.post('/create', createUser as unknown as express.RequestHandler);
router.post('/login', loginUser as unknown as express.RequestHandler); 
router.get('/get/:userId', readUser as unknown as express.RequestHandler);
router.get('/get', readAllUsers as unknown as express.RequestHandler);
router.delete('/delete/:userId', deleteUser as unknown as express.RequestHandler);

export default router;
