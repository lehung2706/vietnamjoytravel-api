import PostModel from "../models/postModel.js";
import mongoose from "mongoose";

export const getPost = async (req, res) => {
  try {
    let { limit } = req.body;
    if (!limit) limit = 999999999;
    const postMessage = await PostModel.find({ deleted: false }).limit(limit);
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const detailPost = async (req, res) => {
  try {
    const postMessage = await PostModel.findOne({ _id: req.params.id });
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const detailPostBySlug = async (req, res) => {
  try {
    const postMessage = await PostModel.findOne({ slug: req.params.slug });
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const postModel = new PostModel({ ...post, creator: req.userId });
  try {
    await postModel.save();
    res.status(201).json(postModel);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with this id");

  const updatePost = await PostModel.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatePost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with this id");

  const post = await PostModel.findByIdAndUpdate(_id, { deleted: true });

  res.json({ message: "Post delete successfully" });
};
