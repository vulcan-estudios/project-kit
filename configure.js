// Copy Foundation starting imports

var fs = require('fs');

var cleanSpacesAndComments = function (text) {
    text = text.replace(new RegExp(/^\s*\/\/.*$/gm), '');
    text = text.replace(/^\s*[\r\n]/gm, '');
    text = text.replace(/^\s*/gm, '');
    text = text.replace(/\s*$/gm, '');
    return text;
};

// Copy settings file
var foundationSettingsPath = __dirname +'/bower_components/foundation/scss/foundation/_settings.scss';
var newFoundationSettingsPath = __dirname +'/src/scss/_settings.scss';
fs.createReadStream(foundationSettingsPath).pipe(fs.createWriteStream(newFoundationSettingsPath));

// Main file data
var foundationPath = __dirname +'/bower_components/foundation/scss/foundation.scss';
var newFoundationPath = __dirname +'/src/scss/app.scss';
var foundationData = fs.readFileSync(foundationPath).toString();
foundationData = cleanSpacesAndComments(foundationData);

// Update main file
var newFoundationData = [
    '// Project kit',
    '\n\n',
    '// Settings',
    '\n',
    '//@import "settings";',
    '\n\n',
    '// Foundation modules',
    '\n',
    '//'  // First module line
].join('') +
foundationData.replace(/\r\n/gm, '\n').replace(/\n/gm, '\n'+ '//') + [
    '\n\n',
    '// Example',
    '\n',
    '@import "example";',
    '\n'
].join('');
fs.writeFileSync(newFoundationPath, newFoundationData, 'utf8');

console.log('Configuration completed.');
