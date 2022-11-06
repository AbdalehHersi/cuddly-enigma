const Thoughts = require("../models/Thoughts");
const User = require("../models/User");
const reactionSchema = require("../models/Reactions");

const formattedDate = (array) => {
    for (let i = 0; i < array.length; i++) {
        const formattedDates = array[i].createdAt.toDateString();
        array[i].createdAt = formattedDates;
        console.log(array);
    }
}

module.exports = {
    getThoughts(req, res) {
        Thoughts.find()
            // .then((thoughts) => formattedDate(thoughts))
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtId })
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thoughts.create(req.body)
            .then((thoughts) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thoughts._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'Thought created, but found no user with that ID' })
                    : res.json('Created the thought 🎉')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    createReaction(req, res) {
        Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true ,new: true }
            )
        
        .then((reactionData) => {
            !reactionData
                    ? res
                        .status(404)
                        .json({ message: 'Thought created, but found no user with that ID' })
                    : res.json('Created the reaction 🎉')
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    UpdateThought(req, res) {
        Thoughts.updateOne({ _id: req.params.thoughtId }, { $set: { thoughtText: req.body.thoughtText } })
            .then((thoughtData) => !thoughtData ? res.status(404).json({ message: "No thought with that ID" }) : res.json(thoughtData))
            .catch((err) => res.status(500).json(err))
    },
    deleteThought(req, res) {
        Thoughts.deleteOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
        Thoughts.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((thoughts) =>
            !thoughts
              ? res
                  .status(404)
                  .json({ message: 'No thought found with that ID :(' })
              : res.json(thoughts)
          )
          .catch((err) => res.status(500).json(err));
      },
};
