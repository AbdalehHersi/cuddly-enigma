const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: { type: String, unique: true, required: true, trim: true },
        email: { type: String, unique: true, required: true, lowercase: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"] },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thoughts',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "user"
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual property `friendCount` that gets user's friend list count
userSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
        return `${this.friends.length}`;
    });

const User = model('user', userSchema);

module.exports = User;
