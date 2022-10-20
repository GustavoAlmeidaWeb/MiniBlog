const bcrypt = require('bcryptjs');

// User model
const User = require('../models/User');

// Helpers
const generateToken = require('../helpers/generate-token');

module.exports = class UserController {

    static async register(req, res) {
        const { name, email, password } = req.body;

        // Check if user exists
        const userTest = await User.findOne({ where: { email: email }});
        if(userTest) return res.status(422).json({ errors: ['Por favor, utilize outro e-mail para criar uma conta.'] });

        // Password Hash
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        try {
            
            const user = await User.create({name, email, password: passwordHash});
            res.status(201).json({user});

        } catch (error) {

            res.status(422).json({ errors: ['Houve algum problema no registro do usuário.'] });

        }
    }

    static async login(req, res) {

        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ where: { email: email }});
        if(!user) return res.status(401).json({ errors: ['Usuário não encontrado.']});

        // Check password
        if(!(await bcrypt.compare(password, user.password))) return res.status(401).json({ errors: ['Senha incorreta.']});

        try {
            
            res.status(200).json({ id: user.id, token: generateToken(user.id)});
            
        } catch (error) {

            res.status(422).json({ errors: ['Houve algum problema ao fazer login.']});
        }
    }

    static async profile(req, res) {

        const user = req.user;

        if(!user) return res.status(404).json({ errors: ['Usuário não encontrado ou não autenticado.']});

        res.status(200).json(user);

    }

    static async delete(req, res) {

        const user = req.user;

        try {
            
            await User.destroy({ where: { id: user.id }});
            res.status(200).json({ message: 'Conta excluída com sucesso.'});

        } catch (error) {

            res.status(404).json({ errors: ['Houve algum problema na requisição, tente mais tarde.']});           
        }
    }

    static async update(req, res) {

        const { name, password, confirmpassword } = req.body;
        let imageprofile = null;

        if(req.file) {
            imageprofile = req.file.filename;
        }

        const currentUser = req.user;
        const user = await User.findOne({ raw: true, where: { id: currentUser.id}});

        if(name) {
            user.name = name;
        }
        if(password) {
            if(password === confirmpassword) {
                
                // Password Hash
                const salt = await bcrypt.genSalt(12);
                const passwordHash = await bcrypt.hash(password, salt);

                user.password = passwordHash;

            } else {
                return res.status(422).json({ errors: ['As senha precisam ser iguais.']});
            }
        }
        if(imageprofile) {
            user.imageprofile = imageprofile;
        }
    
        try {            
            await User.update(user, { where: { id: currentUser.id}});
            res.status(200).json(user);
            
        } catch (error) {

            res.status(401).json({ errors: ['Houve algum problema, tente mais tarde.']});
            
        }

    }

    static async getUserById(req, res) {

        const { id } = req.params;

        try {
            
            const user = await User.findOne({ where: { id: id }});
            const user_data = {
                id: user.id,
                name: user.name,
                email: user.email,
                imageprofile: user.imageprofile,
            }

            res.status(200).json(user_data);

        } catch (error) {
            
            res.status(404).json({ errors: ['Houve algum problema, tente mais tarde.'] });
        }

    }
}