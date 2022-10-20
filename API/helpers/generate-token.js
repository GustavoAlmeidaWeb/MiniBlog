const jwt = require('jsonwebtoken');

// Token Generator
const generateToken = (id) => {

    // JWT Token
    const token = process.env.JWT_TOKEN;
    
    return jwt.sign({id}, token);
}

module.exports = generateToken;
