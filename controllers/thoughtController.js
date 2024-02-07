const Thought = require('../models/Thought');

const thoughtController = {
  // Get all thoughts
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single thought by id
  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Create a new thought
  createThought: async (req, res) => {
    try {
      const newThought = await Thought.create(req.body);
      res.json(newThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Update a thought by id
  updateThought: async (req, res) => {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedThought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Delete a thought by id
  deleteThought: async (req, res) => {
    try {
      const thoughtToDelete = await Thought.findByIdAndDelete(req.params.id);
      if (!thoughtToDelete) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Add a reaction to a thought
  addReaction: async (req, res) => {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { reactions: req.body } },
        { new: true }
      );
      if (!updatedThought) {
        res.status(404).json({ message: 'No thought found with this id to add a reaction to!' });
        return;
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Remove a reaction from a thought
  removeReaction: async (req, res) => {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { reactions: { reactionId: req.body.reactionId } } },
        { new: true }
      );
      if (!updatedThought) {
        res.status(404).json({ message: 'No thought found with this id to remove a reaction from!' });
        return;
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};

module.exports = thoughtController;

/**
 * Example JSON to add a reaction:
 * 
 * {
 *   "reactionBody": "Loved this thought!",
 *   "username": "user123",
 *   "reactionId": "5f50c31f15a4d2b5f2c9bcf8" // This should be a valid MongoDB ObjectId
 * }
 */
