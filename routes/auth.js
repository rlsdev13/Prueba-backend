const { Router } = require('express');
const { check } = require('express-validator');

const { googleSignIn, revalidateToken } = require('../controllers');
const { validateFields, validateJWT } = require('../middlewares');

const router = Router();

router.post('/login',[
    check('id_token', 'id_token required').notEmpty(),
    validateFields
], googleSignIn);

router.get('/renew', validateJWT , revalidateToken );

module.exports = router;