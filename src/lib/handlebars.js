/* Includes a specific syntax (format) so any human being can read how much time has passed 
since the idea was created. */
const { format } = require('timeago.js');

const helpers = {};

helpers.timeago = (timestamp) => {
    return format(timestamp);
}

module.exports = helpers;