// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

const dbName = 'TodoApp';
const url = `mongodb://localhost:27017/${dbName}`;
const Todos = 'Todos';
const Users = 'Users';

MongoClient.connect(url, (err, client) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db(dbName);

  db.collection(Users).findOneAndUpdate({
    _id: new ObjectID('5a9b01378075269491d93d02')
  },{
    $inc: {
      age: 1
    }
  },{
    returnOriginal: false
  }).then(res => console.log(res));

  // db.collection(Todos).findOneAndUpdate({
  //   _id: new ObjectID('5a9ae4858075269491d939fd')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // },{
  //   returnOriginal: false
  // }).then(res => console.log(res));

  // client.close();
});