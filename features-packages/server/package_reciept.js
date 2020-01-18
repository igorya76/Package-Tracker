const PackageOpen = require('../model/packages_open');
const Customer = require('../../features-customers/model/customer');
const moment = require("moment")

module.exports.log = async function({customer_number}){
  console.log('logg');
  console.log({customer_number})
  await PackageOpen.addUnique({customer_number,date: moment(),date_iso: moment().toISOString() });
}