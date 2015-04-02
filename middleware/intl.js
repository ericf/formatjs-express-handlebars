'use strict';

var path = require('path');

// See: http://formatjs.io/guides/runtime-environments/#user-locale-server
module.exports = function (req, res, next) {
    var app              = req.app;
    var availableLocales = app.get('available locales');
    var defaultLocale    = app.get('default locale');

    // Use content negotiation to find the best locale.
    var locale   = req.acceptsLanguages(availableLocales) || defaultLocale;
    var messages = require(path.join('../locales', locale));

    // Populate the special `data` local for handlebars-intl to use when
    // rendering the Handlebars templates.
    // See: https://github.com/ericf/express-handlebars#renderviewviewpath-optionscallback-callback
    // See: http://formatjs.io/handlebars/
    var handlebarsData = res.locals.data || (res.locals.data = {});

    handlebarsData.intl = {
        locales : [locale],
        messages: messages
    };

    next();
};
