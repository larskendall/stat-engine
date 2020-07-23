const Handlebars = require('handlebars');
const util = require('util');
const fs = require('fs');
const emailUtil = require('../server/util/email');

const readFileAsync = util.promisify(fs.readFile);

(async function() {
  // let fileStr = await readFileAsync('./email/section/incident-summary.handlebars', 'utf8');
  // Handlebars.registerPartial('incidentSummary', fileStr);
  //
  // fileStr = await readFileAsync('./email/section/unit-summary.handlebars', 'utf8');
  // Handlebars.registerPartial('unitSummary', fileStr);
  //
  // fileStr = await readFileAsync('./email/test.handlebars', 'utf8');
  // const template = Handlebars.compile(fileStr);
  //
  // const templateData = {
  //   sections: [{
  //     type: 'incidentSummary',
  //     settings: {
  //       metrics: [
  //         'total',
  //         'ems',
  //         'fire',
  //       ],
  //     },
  //   }, {
  //     type: 'unitSummary',
  //     settings: {
  //       metrics: [
  //         'responses',
  //         'transports',
  //         'utilization (min)',
  //       ],
  //       sortBy: 'responses',
  //     },
  //   }],
  // };
  //
  // const output = template(templateData);
  //
  // console.log(output);
})();
