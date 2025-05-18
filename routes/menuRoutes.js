import express from 'express';
import { getMenuItems, addMenuItem, deleteMenuItem, updateMenuItem } from '../controllers/menuController.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.get('/items', getMenuItems);
router.post('/add-item', upload.single('image'), addMenuItem);
router.delete('/items/:id', deleteMenuItem);
router.put('/update-item/:id', updateMenuItem); // <- This line is crucial


export default router;

