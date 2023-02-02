const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params._id })
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { username: req.params.username },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                )
            })
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.pararms._id },
            { $set: req.body },
            { new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thoughts with this ID!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findByIdAndRemove({ _id: req.params._id })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thoughts with this ID!' })
                    : res.json({ message: 'Thought deleted successfully.' })
            )
    },
    addReaction(req, res) {
        Thought.findAndUpdate(
            { _id: req.params._id },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thoughts with this ID!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params._id },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thoughts with this ID!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    }
}

module.exports = thoughtController;