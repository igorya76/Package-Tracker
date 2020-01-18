const mongoose = require('mongoose');
const moment = require('moment');
const dbHelper = require('../../db_helper');


const dataSchema = mongoose.Schema({
  first_name: {type: String},
  last_name: {type: String},
  email: {type: String},
  phone_name: {type: String},
  last_package_received_date: {type: Date},
  last_package_received_date_iso: {type: String},
  last_package_pickup_date: {type: Date},
  last_package_pickup_date_iso: {type: String},


});

let db = module.exports = mongoose.model('customer', dataSchema);


module.exports.return = async function ({query,select, sort}){
  let items = await dbHelper.return({db, query, select, sort});
  return items; 
}
  
module.exports.returnSingle = async function({query, select, sort}){
    return dbHelper.returnSingle({db, query, select, sort})    
}

module.exports.add = async function({query, data}){
  console.log({query, data})
  return await dbHelper.add({db, query, data})
}


module.exports.addUnique = async function(newData){
  let data = {
    ...newData,
  }
  return dbHelper.add({db, data, query:{unique: true}})
}

// module.exports.delete = async function({project_id}){
//   db.deleteMany({project_id, completed: false	},(err, res)=>{
//     if(err){console.log({error: true, err})}
//     c	onsole.log('success deleting open', {project_id})
//   	})
// }