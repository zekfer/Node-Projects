const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');
const reviewRouter = require('./Routes/reviewRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./Controllers/errorController');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// Global MiddleWares
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests Please try again later!',
});
app.use('/api', limiter);
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});
app.use(express.static(path.join(__dirname, 'public')));

// Routes

app.get('/', (req, res) => {
  res.status(200).render('base');
});
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.get('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
