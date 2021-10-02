const { Router } = require('express');
const { check } = require('express-validator');
const { getCalendar } = require('../controllers');
const { validateJWT, validateFields } = require('../middlewares');

const router = Router();

router.post('/',[
    check('tkn','token_g is required').notEmpty(),
    validateFields
],getCalendar);

router.post('/',/*validateJWT*/[],getCalendar);

module.exports = router;