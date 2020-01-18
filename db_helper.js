
module.exports.alwaysNew = async function({db, data,query}){
  return await newItem({db, data, query})
}

module.exports.add = async function( {db, data, query}){

  
  //Does Data Exist?
  let exist = await doesItemExist({db, query})
  // console.log({exist}); 

  if(!exist){
    //Add New Item to Database
    // console.log('adding item to database');
    // console.log({data})
    return await newItem({db, data, query})
    
  
  }else{
    //Update Item in Database
    return await updateData({db, data, query})

    }

}

function doesItemExist({db, query}){
  // console.log('Enter Does Item Exist');
  // console.log({query})
  return new Promise((resolve, reject)=>{
    db.findOne(query,(err, item)=>{
      //console.log({item})
      if(err) {reject()}
      if(item != null){
        //console.log(`DB Add: ${JSON.stringify(query)} does exist`);
        resolve(true);
      }else{
        //console.log(`DB Add: ${JSON.stringify(query)} does NOT exist`);
        resolve(false);
      }
    })
  });
}



function updateData({db, data, query}){
  // console.log('update data db helper', data, query)
  return new Promise((resolve, reject)=>{
    db.update(query, data, function(err,response){

      if (err){
        console.log('error', 'Directory Database Update Error', {data, err});
        console.log(err)
        reject(err);
   
      } else {
        // console.log('response recieved');
        resolve(response);
 
      }
    });
  }) //Close Promise
};

function newItem({db, data, query}){
  return new Promise((resolve, reject)=>{
    // console.log('adding', data);
    let d = new db(data);
    // console.log({d})
    d.save(function(err, response){
      if(err){
        console.log(`DB Error: Adding ${JSON.stringify(query)} to database`)
        console.log(err);
        console.log(data);
        console.log('error creating new')
        reject(false);
      } else {
        // console.log('success');
        resolve(response);
    
      }
    })
  })
};


module.exports.return = async function ({query, db, select}){
  return new Promise((resolve, reject)=>{
    // console.log({query});
    if(!select){
      db.find(query, function(err, data){
        if(err){
          reject(`DB Error: Returning ${JSON.stringify} from ${db.collection}`)
        }else {
          //console.log(`DB Success: Returning ${JSON.stringify} from ${db.collection}`)
          resolve(data);
        }
      });
    }else{
        db.find(query,select, function(err, data){
          if(err){
            reject(`DB Error: Returning ${JSON.stringify} from ${db.collection}`)
          }else {
            //console.log(`DB Success: Returning ${JSON.stringify} from ${db.collection}`)
            resolve(data);
          }
        });
    }
  })
}

module.exports.returnSingle = async function ({query, db}){
  return new Promise((resolve, reject)=>{
    // console.log({query});

      db.findOne(query, function(err, data){
        if(err){
          reject(`DB Error: Returning ${JSON.stringify} from ${db.collection}`)
        }else {
          //console.log(`DB Success: Returning ${JSON.stringify} from ${db.collection}`)
          resolve(data);
        }
      });

})}

