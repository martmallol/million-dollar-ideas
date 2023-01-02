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
        return await bcrypt.compare(password, savedPassword);
    } catch(e) {
        console.log(e);
    }
};

// Check that no input exceeds its maximum length
helpers.maxLengthCheck = (object, maxLength) => {
    return (JSON.stringify(object).length <= maxLength);
};


module.exports = helpers;