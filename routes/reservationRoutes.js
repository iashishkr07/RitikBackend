import express from 'express';
import { createReservation } from '../controllers/reservationController.js';

const router = express.Router();

router.post('/reservations', createReservation);

export default router;
