const userController = require('../Controllers/User.controllers');

module.exports = (app) => {
    app.post('/api/register', userController.register);
    app.post('/api/login', userController.login);
    app.post('/api/logout', userController.logout);
    app.get('/api/refresh', userController.refresh);
}