const { DataTypes } = require('sequelize');
const db = require('../db/conn');

// User model
const User = require('./User');
const Post = require('./Post');

const Comment = db.define('Comment', {
    comment: {
        type: DataTypes.TEXT('medium'),
    },
});

Comment.belongsTo(Post);
Comment.belongsTo(User);
Post.hasMany(Comment);

module.exports = Comment;