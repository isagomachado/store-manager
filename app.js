const express = require('express');
require('express-async-errors');
const productsRoutes = require('./routes/productsRoutes');
const errorMidleware = require('./middlewares/errorMidleware');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoutes);

app.use(errorMidleware);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
