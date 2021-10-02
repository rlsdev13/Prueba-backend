const validate_fields = require('./validate-fields');
const validate_jwt = require('./validate-jwt');

module.exports = {
    ...validate_fields,
    ...validate_jwt
}