const { body } = require('express-validator');

const postInsertValidation = () => {
    return [
        body('title')
            .not()
            .equals('undefined')
            .isString()
            .withMessage('O titulo é obrigatorio.')
            .isLength({min: 3})
            .withMessage('O titulo precisa ter no minimo 3 caracteres.'),
        body('description')
            .isString()
            .withMessage('O corpo do texto é obrigatório.')
            .isLength({ min: 20 })
            .withMessage('O texto precisa ter no mínimo 20 caracteres.'),
        body('tags')
            .isString()
            .withMessage('Insira 1 tag pelo menos.')
            .isLength({ min: 2 })
            .withMessage('A tag precisa ter no mínimo 2 caracteres.'),
        body('imagepost')
            .custom((value, {req}) => {
                if(!req.file){
                    throw new Error("A imagem é obrigatória.")
                }
                return true;
            })
    ]
}

const postUpdateValidation = () => {
    return [
        body('title')
            .optional()
            .isString()
            .withMessage('O titulo é obrigatorio.')
            .isLength({min: 3})
            .withMessage('O titulo precisa ter no minimo 3 caracteres.'),
        body('description')
            .optional()
            .isString()
            .withMessage('O corpo do texto é obrigatório.')
            .isLength({ min: 20 })
            .withMessage('O texto precisa ter no mínimo 20 caracteres.'),
        body('tags')
            .optional()
            .isString()
            .withMessage('Insira 1 tag pelo menos.')
            .isLength({ min: 2 })
            .withMessage('A tag precisa ter no mínimo 2 caracteres.'),
        body('imagepost')
            .optional()
            .custom((value, {req}) => {
                if(!req.file){
                    throw new Error("A imagem é obrigatória.")
                }
                return true;
            })
    ]
}

const commentValidation = () => {
    return [
        body('comment')
            .isString()
            .withMessage('O comentário é obrigatório.')
            .isLength({ min: 5 })
            .withMessage('O comentário deve ter no mínimo 5 caracteres.')
    ]
}

module.exports = {
    postInsertValidation,
    postUpdateValidation,
    commentValidation,
}