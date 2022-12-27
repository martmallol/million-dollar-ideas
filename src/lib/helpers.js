const bcrypt = require('bcryptjs');
const helpers = {};

// Encrypt Password method
helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // Creates salt (pattern), it takes time
    const hash = await bcrypt.hash(password, salt) // Creates hash, it takes time
    return hash;
};

// Check if the password submitted matches to the one stored in the DB
helpers.matchPassword = async (password, savedPassword) => {
    try {
        await bcrypt.compare(password, savedPassword);
    } catch(e) {
        console.log(e);
    }
};

module.exports = helpers;