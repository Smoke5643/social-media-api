const { User, Thought } = require('../models')

const userController = {
    getAllUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params._id })
            .populate(['friends', 'thoughts'])
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    createNewUser(req, res) {
        User.create(req.body)
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params._id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No users with this ID!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No users with this ID!' })
                    : Thought.deleteMany({ userId: req.params.userId })
            )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'User deleted, no Thoughts found!' })
                    : res.json({ message: 'User and Thoughts deleted successfully' })
            )
            .catch((err) => {
                console.log(err)
                res.status(500).json(err);
            }
            )
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        )
            .then((user) => {
                return User.findByIdAndUpdate(
                    { _id: req.params.friendId },
                    { $addToSet: { friends: req.params.userId } },
                    { new: true }
                )
            })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No users with this ID!' })
                    : res.json({ message: 'Added friend.' })
            )
    },
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then((user) => {
                return User.findByIdAndUpdate(
                    { _id: req.params.friendId },
                    { $pull: { friends: req.params.userId } },
                    { new: true }
                )
            })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No users with this ID!' })
                    : res.json({ message: 'Removed friend.' })
            )
    },
}

moduel.exports = userController;