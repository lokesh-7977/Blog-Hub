import { Router } from 'express';
import { createComents , getComents , updateComents , deleteComents } from '../controllers/coments.controller.js';

const router = Router();

router.post('/',createComents)
router.patch('/',updateComents);
router.get('/',getComents)
router.delete('/',deleteComents);

export default router;
