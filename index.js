const express = require('express');
const app = express();

// midelware
app.use(express.static('public'));

// si recibo formulario
//app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// PRODUCTOS
// const productosRouter = require('./routes/productos.router');
// app.use('/productos', productosRouter);

// lo anterior se puede escribir asi
app.use('/product', require('./routes/product.router'));

// USUARIOS

app.use('/coment', require('./routes/coment.router'));

// COMENTARIOS

app.use('/usuarios', require('./routes/usuarios.router'));

const PORT = 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
