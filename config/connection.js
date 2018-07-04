// this module is responsible for connection to arangoDB
let Database = require('arangojs').Database;

let db = new Database('http://root:@localhost:8529');
//connect to the database
db.useDatabase('insibat');

//create collections if does not exist
db.collection('insibat').create().then(
    () => console.log('Collection created'),
    err => console.error('already exists: insibat collection')
).catch(err=>console.log());
db.collection('alert').create().then(
    () => console.log('Collection created'),
    err => console.error('already exists: alert collection')
).catch(err=>console.log());
db.collection('user').create().then(
    () => console.log('Collection created'),
    err => console.error('already exists: user collection')
).catch(err=>console.log()); 


module.exports = db;