module.exports = {
    isLoggedIn(req, res, next) {
        // isAuthenticated is a passport method that gets attached to the request
        return (req.isAuthenticated() ? next() : res.redirect('/login'));
    },

    isNotLoggedIn(req, res, next) {
        return (!req.isAuthenticated() ? next() : res.redirect('/profile'));
    }
};