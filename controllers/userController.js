const { User } = require('../models');

const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({})
        .select('-__v')
        .populate('thoughts')
        .populate('friends');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single user by id
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .select('-__v')
        .populate('thoughts')
        .populate('friends');
      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Create a new user
  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Update a user by id
  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedUser) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Delete a user by id
  deleteUser: async (req, res) => {
    try {
      const userToDelete = await User.findByIdAndDelete(req.params.id);
      if (!userToDelete) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json({ message: 'User successfully deleted!' });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Add a friend to a user
  addFriend: async (req, res) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!updatedUser) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Remove a friend from a user
  removeFriend: async (req, res) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!updatedUser) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json(err);
    }
  }
};

module.exports = userController;
