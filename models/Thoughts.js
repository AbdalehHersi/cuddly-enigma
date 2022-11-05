const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reactions");


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 15,
            maxLength: 500,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
            ref: "user",
        },
        reactions: [ reactionSchema ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return `${this.reactions.length}`;
    });

const Thoughts = model('thoughts', thoughtSchema);

module.exports = Thoughts;