// Models
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const { Op } = require('sequelize');

module.exports = class PostController {
    static async getAll(req, res) {

        const posts = await Post.findAll({
            include: User,
            order: [['createdAt', 'DESC']],
        });

        res.status(200).json(posts);
    }

    static async newPost(req, res) {

        const user = await User.findOne({ where: { id: req.user.id }});

        if(!user) return res.status(404).json({ errors: ['Usuário não encontrado ou acesso inválido.']});

        const { title, description, tags } = req.body;
        let image = '';

        if(req.file) {
            image = req.file.filename;
        }

        const newPost = {
            title,
            description,
            tags,
            imagepost: image,
            UserId: user.id,
        }

        try {

            const post = await Post.create(newPost);
            res.status(201).json({ post, comments: [] });
            
        } catch (error) {
         
            res.status(422).json({ errors: ['Houve algum problema, por favor tente mais tarde.'], error});
            
        }

    }

    static async getPost(req, res) {

        const { id } = req.params;

        const currentPost =  await Post.findOne({ 
            where: { id },
            include: { model: User },
            plain: true,
        });
        
        const currentComments = await Comment.findAll({ 
            where: { PostId: id }, 
            include: { model: User },
        });

        const post = {
            post: currentPost,
            comments: currentComments,
        }

        if(!currentPost) {
            return res.status(404).json({ errors: ['Nenhum dado encontrado.']});
        }

        res.status(200).json(post);

    }

    static async getPostsByUser(req, res) {

        const { id } = req.user;

        const posts = await Post.findAll({ 
            where: { UserId: id },
            include: Comment,
            order: [['createdAt', 'DESC']],
        });

        res.status(200).json(posts);
    }

    static async getPostsByUserId(req, res) {

        const { id } = req.params;

        const posts = await Post.findAll({
            where: { UserId: id },
            order: [['createdAt', 'DESC']],
        });

        res.status(200).json(posts);

    }

    static async updatePost(req, res) {

        const { id } = req.params;
        const post = await Post.findOne({ where: { id }, raw: true });

        if(!post) {
            return res.status(404).json({ errors: ['Nenhum dado encontrado.']});
        }
        if(post.UserId !== req.user.id) {
            return res.status(401).json({ errors: ['Você não tem permissão para executar essa ação.']});
        }

        const { title, description, tags } = req.body;
        let image = null;

        if(req.file) {
            image = req.file.filename;
        }
        if(title) {
            post.title = title;
        }
        if(description) {
            post.description = description;
        }
        if(tags) {
            post.tags = tags;
        }
        if(image) {
            post.imagepost = image;
        }

        try {

            await Post.update(post, { where: { id }});
            res.status(200).json({ message: 'Post atualizado com sucesso.', post });

        } catch (error) {

            res.status(422).json({ errors: ['Houve algum problema na requisição, por favor tente mais tarde.']});
            
        }

    }

    static async deletePost(req, res) {

        const { id } = req.params;
        const post = await Post.findOne({ where: { id }});

        if (post.UserId !== req.user.id) {
            return res.status(401).json({ errors: ['Você não possui permissão para executar essa ação.']});
        }

        try {
            
            await Comment.destroy({ where: { PostId: id }});
            await Post.destroy({ where: { id }});
            res.status(200).json({ message: 'Post excluído com sucesso.' });

        } catch (error) {
         
            res.status(422).json({ errors: ['Houve algum problema na requisição, por favor tente mais tarde.']});
        }

    }

    static async newComment(req, res) {

        const { user } = req;
        const { id } = req.params;
        const { comment } = req.body;

        const newComment = {
            comment,
            PostId: Number(id),
            UserId: user.id,
        }

        try {
            
            await Comment.create(newComment);
            res.status(201).json({ message: 'Comentário adicionado com sucesso.' });

        } catch (error) {

            res.status(422).json({ errors: ['Houve algum problema, por favor tente mais tarde.'] });
            
        }        

    }

    static async deleteComment(req, res) {

        const { id } = req.params;
        const comment = await Comment.findOne({ where: { id }});

        if(!comment) {
            return res.status(404).json({ errors: ['Nenhum dado encontrado.']});
        }

        if(comment.UserId !== req.user.id) {
            return res.status(401).json({ errors: ['Você não possui permissão para executar essa ação.']});
        }

        try {
            
            await comment.destroy();
            res.status(200).json({ message: 'Comentário excluído com sucesso.'});

        } catch (error) {

            res.status(422).json({ errors: ['Houve algum problema na requisição, por favor tente mais tarde.']});
            
        }

    }

    static async searchPosts(req, res) {

        const { q } = req.query;

        try {

            const posts = await Post.findAll({
                include: User,
                where: {
                    title: {[Op.like]: `%${q}%`},
                },
                order: [['createdAt', 'DESC']],
            });
            
            res.status(200).json(posts);

        } catch (error) {

            res.status(422).json({ errors: ['Houve algum problema na requisição, por favor tente mais tarde.']});
            
        }

    }
}