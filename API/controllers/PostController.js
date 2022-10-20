const Post = require('../models/Post');

module.exports = class PostController {
    static async getAll(req, res) {
        res.json({ message: "Chegou aqui" });
    }
}