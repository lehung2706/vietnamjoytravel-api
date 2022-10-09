import express from 'express';
var router = express.Router();


import {getPost, createPost, updatePost, deletePost, detailPost, detailPostBySlug} from '../controllers/postController.js';

router.post('/', getPost);
router.get('/:id', detailPost);
router.get('/detail/:slug', detailPostBySlug);
router.post('/create', createPost);
router.patch('/update/:id', updatePost);
router.patch('/delete/:id', deletePost);

export default router;