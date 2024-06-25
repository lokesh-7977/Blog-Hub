import mongoose from 'mongoose';
import Posts from '../models/posts.schema.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await Posts.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const createPosts = async (req, res) => {
    try {
        const post = req.body;
        const newPost = new Posts(post);
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updatePosts = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const postUpdates = req.body; 
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
        const updatedPost = await Posts.findByIdAndUpdate(_id, { ...postUpdates }, { new: true });
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deletePosts = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
        await Posts.findByIdAndDelete(id);
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

