const generate_jwt = require('./generate-jwt');
const google_verify = require('./google-verify');

module.exports = {
    ...generate_jwt,
    ...google_verify
}