const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userModelSchema = new Schema ({
    user_nickname: {type: String, required: true},
    user_email: {type: String, required: true},
    user_password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true}
});

userModelSchema.index({ user_nickname: 1, user_email: 1, user_password: 1 }, { unique: true });

const User = mongoose.model('User', userModelSchema);
module.exports = User;