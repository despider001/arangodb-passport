// this module is responsible for connection to arangoDB
let Database = require('arangojs').Database;

let db = new Database({
    url: "http://localhost:8529"
});
//connect to the database
db.useDatabase('newDB');
db.useBasicAuth("root", "");

db.collection('user').create().then(
    () => console.log('Collection created'),
    err => console.error('user collection already exists')
).catch(err=>console.log()); 

module.exports = db;