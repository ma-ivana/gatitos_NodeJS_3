const express = require('express');
const app = express();
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const gatitoRouter = require('./routes/gatitoRoutes');


app.use(express.json());

app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('estoy en un middleware');
  req.requestedAt = new Date().toISOString();
  next();
});

app.use((req, res, next) => {
  console.log('estoy en el segundo middleware');
  next();
});


app.get('/', (req, res) => {
  res.json({
  Estado: "¡Bienvenido a mi API!"
  })
});


app.use('/users', userRouter);
app.use('/gatitos', gatitoRouter);

module.exports = app;

//recurso gatitos: con los gatitos
//recurso users: admin, mod, clientes
//recurso refugios: 