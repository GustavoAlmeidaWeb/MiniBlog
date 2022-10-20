const User = require('../models/User');
const jwt = require('jsonwebtoken');
const jwt_token = process.env.JWT_TOKEN;

const authGuard = async (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(401).json({ errors: ['Acesso negado.']});

    try {
        
        const verified = jwt.verify(token, jwt_token);
        req.user = await User.findOne({ where: { id: verified.id }});
        next();

    } catch (error) {

        res.status(401).json({ errors: ['Token inválido.'] });
        
    }

}

module.exports = authGuard;