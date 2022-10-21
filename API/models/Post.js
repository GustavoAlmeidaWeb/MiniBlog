const { DataTypes } = require('sequelize');
const db = require('../db/conn');

// User model
const User = require('./User');

const Post = db.define('Post', {
    title: {
        type: DataTypes.STRING,
        require: true,
    },
    description: {
        type: DataTypes.TEXT('long'),
        require: true,
    },
    tags: {
        type: DataTypes.STRING,
    },
    imagepost: {
        type: DataTypes.STRING,
    },
});

Post.belongsTo(User);
User.hasMany(Post);

module.exports = Post;