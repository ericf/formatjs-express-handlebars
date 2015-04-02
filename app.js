'use strict';

require('./polyfills');

var express        = require('express');
var exphbs         = require('express-handlebars');
var HandlebarsIntl = require('handlebars-intl');

var config = require('./config');

// Setup and export the Express app.
var app = module.exports = express();
app.set('name', 'FormatJS Express Handlebars');
app.set('port', config.port);
app.set('available locales', config.availableLocales);
app.set('default locale', 'en-US');

// Register Handlebars with Express, and Handlebars Intl with Handlebars.
var hbs = exphbs.create({extname: '.hbs'});
app.engine(hbs.extname, hbs.engine);
app.set('view engine', hbs.extname);
HandlebarsIntl.registerWith(hbs.handlebars);

app.use(require('./middleware/intl'));

app.route('/').get(function (req, res) {
    res.render('home', {layout: 'main'});
});
