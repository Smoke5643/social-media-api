const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req,res) {
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
    
}

module.exports = thoughtController