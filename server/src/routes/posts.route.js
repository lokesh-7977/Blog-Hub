import { Router } from 'express';
import { getPosts , createPosts, updatePosts , deletePosts } from '../controllers/posts.controller.js';

const router = Router();

router.get('/', getPosts);
router.post('/', createPosts);
router.patch('/:id', updatePosts);
router.delete('/:id', deletePosts);

export default router;