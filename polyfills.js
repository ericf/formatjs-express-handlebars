/* global Intl, IntlPolyfill */
'use strict';

var config = require('./config');

// See: http://formatjs.io/guides/runtime-environments/#polyfill-node
//
// TODO: This logic should move into the Polyfill since it's very complex to do
// this in Node 0.12: https://github.com/yahoo/formatjs-site/issues/178
if (global.Intl) {
    // Determine if the built-in `Intl` has the locale data we need.
    var hasBuiltInLocaleData = config.availableLocales.every(function (locale) {
        return Intl.NumberFormat.supportedLocalesOf(locale)[0] === locale &&
                Intl.DateTimeFormat.supportedLocalesOf(locale)[0] === locale;
    });

    if (!hasBuiltInLocaleData) {
        // `Intl` exists, but it doesn't have the data we need, so load the
        // polyfill and replace the constructors with need with the polyfill's.
        require('intl');
        Intl.NumberFormat   = IntlPolyfill.NumberFormat;
        Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
    }
} else {
    // No `Intl`, so use and load the polyfill.
    global.Intl = require('intl');
}
