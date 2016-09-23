const express = require('express');
const path = require('path');
const config  = require('./config');


const PORT = process.env.PORT || config.dev.port;

// middleware
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// routers
const routes = require('./routes/index');
const users = require('./routes/users');

const app = express();

app.locals.env = app.get('env');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const webpack = require('webpack');
const webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack/webpack.prod.conf')
  : require('./webpack/webpack.dev.conf');

const webpackAssets = require('express-webpack-assets');


if(process.env.NODE_ENV !== 'production'){
  let compiler = webpack(webpackConfig);
  let devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  });

  let hotMiddleware = require('webpack-hot-middleware')(compiler);
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
      hotMiddleware.publish({ action: 'reload' });
      cb()
    });
  });

  app.use(devMiddleware);
  app.use(hotMiddleware);
}
app.use(webpackAssets('./public/webpack-assets.json', {
  devMode: process.env.NODE_ENV !== 'production'
}));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
