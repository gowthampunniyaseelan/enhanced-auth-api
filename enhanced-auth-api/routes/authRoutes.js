const authController = require('../controllers/authController');
const passport = require('passport');
const authRoutes = [
    {
        path: '/api/auth/register',
        method: 'POST',
        handler: authController.register,
        middleware:[]
    },
    {
        path: '/api/auth/login',
        method: 'POST',
        handler: authController.login,
        middleware:[]
    },
    {
        path: '/api/auth/google',
        method: 'GET',
        handler: (req, res) => passport.authenticate('google', { scope: ['profile', 'email'] })(req, res),
        middleware:[]
    },
    {
        path: '/api/auth/google/callback',
        method: 'GET',
        handler: (req, res, next) => passport.authenticate('google', { failureRedirect: '/' }, authController.oauthCallback('google'))(req, res, next),
        middleware: []
    },
    {
        path: '/api/auth/facebook',
        method: 'GET',
        handler: (req, res) => passport.authenticate('facebook', { scope: ['email'] })(req, res),
        middleware: []
    },
    {
        path: '/api/auth/facebook/callback',
        method: 'GET',
        handler: (req, res, next) => passport.authenticate('facebook', { failureRedirect: '/' }, authController.oauthCallback('facebook'))(req, res, next),
        middleware: []
    },
    {
        path: '/api/auth/twitter',
        method: 'GET',
        handler: (req, res) => passport.authenticate('twitter')(req, res),
        middleware: []
    },
    {
        path: '/api/auth/twitter/callback',
        method: 'GET',
        handler: (req, res, next) => passport.authenticate('twitter', { failureRedirect: '/' }, authController.oauthCallback('twitter'))(req, res, next),
        middleware: []
    },
    {
        path: '/api/auth/github',
        method: 'GET',
        handler: (req, res) => passport.authenticate('github', { scope: ['user:email'] })(req, res),
        middleware: []
    },
    {
        path: '/api/auth/github/callback',
        method: 'GET',
        handler: (req, res, next) => passport.authenticate('github', { failureRedirect: '/' }, authController.oauthCallback('github'))(req, res, next),
        middleware: []
    },
    {
        path: '/api/auth/logout',
        method: 'GET',
        handler: authController.logout,
        middleware:[]
    },

];

module.exports = authRoutes;
