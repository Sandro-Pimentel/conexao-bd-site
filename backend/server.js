const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const livrosRoutes = require('./routes/livrosRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/livros', livrosRoutes);

app.listen(PORT, () => {
    console.log(`Serviço rodando na porta ${PORT}`);
});