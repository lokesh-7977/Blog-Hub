import mongoose from "mongoose";
import Coments from "../models/coments.schema.js";

export const getComents = async (req, res) => {
  try {
    const coments = await Coments.find();
    res.status(200).json(coments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createComents = async (req, res) => {
  try {
    const coment = req.body;
    const newComent = new Coments(coment);
    await newComent.save();
    res.status(201).json(newComent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateComents = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const comentUpdates = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No coment with that id");
    const updatedComent = await Coments.findByIdAndUpdate(
      _id,
      { ...comentUpdates },
      { new: true }
    );
    res.json(updatedComent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteComents = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const deleteComent = await Coments.findByIdAndDelete(_id);
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No comment with that id");
    if (!deletedComent) return res.status(404).send("No comment with that id");
    res.json({ message: "Comment Deleted Successfully", deleteComent });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
