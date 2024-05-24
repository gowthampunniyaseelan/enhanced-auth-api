const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   name: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   profileImage: { type: String },
   bio: { type: String },
   phone: { type: String },
   isAdmin: { type: Boolean, default: false },
   isPublic: { type: Boolean, default: true },
   googleId: { type: String },
   facebookId: { type: String },
   twitterId: { type: String },
   githubId: { type: String },
   provider:String,
   role:{ type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
