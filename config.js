'use strict';

var glob = require('glob');
var path = require('path');

// Determine the app's available locales by globbing for files in locales/.
exports.availableLocales = glob.sync('*.json', {
    cwd: './locales/'
}).map(function (file) {
    return path.basename(file, '.json');
});

exports.port = process.env.PORT || 5000;
