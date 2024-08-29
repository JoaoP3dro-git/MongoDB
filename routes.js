const bodyParser = require('body-parser');
const product = require('./routes/product');
const auth = require('./routes/auth');

module.exports = (app) => {
    app
    .use(
        '/api/product/',
        bodyParser.json(),
        product
    )
    .use(
        '/api/auth/',
        bodyParser.json(),
        auth
    )
}