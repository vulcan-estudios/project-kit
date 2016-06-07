const motor = require('./motor');

const templateBody = _.template(require('./templates/body.html'));
const templateChassis = _.template(require('./templates/chassis.html'));
const templateEngine = _.template(require('./templates/engine.html'));

console.log('Car component!');
