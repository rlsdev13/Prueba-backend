const auth = require('./auth');
const calendar = require('./calendar');

module.exports = {
    ...auth,
    ...calendar
}