const productControllers = require('../Controllers/Products.controllers');
const authorize = require('../Configure/jwt.configure');

module.exports = (app) => {
    app.post('/api/prod/create',authorize, productControllers.create);
    app.get('/api/prod/getOne/:id',authorize, productControllers.getOne);
    app.get('/api/prod/getAll', authorize, productControllers.getAll);
    app.put('/api/prod/update/:id', productControllers.update);
    app.delete('/api/prod/delete/:id',authorize, productControllers.delete);
}