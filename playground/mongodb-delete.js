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

  //deleteMany
  // db.collection(Todos).deleteMany({text: 'Eat lunch'}).then(res => {
  //   console.log(res);
  // });

  //deleteOne
  // db.collection(Todos).deleteOne({text: 'Eat lunch'}).then(res => {
  //   console.log(res);
  // });

  //findOneAndDelete
  // db.collection(Todos).findOneAndDelete({completed: false}).then(res => {
  //   console.log(res);
  // });

  // db.collection(Users).deleteMany({name: 'Andrew'});

  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5a9aa58c75ea6b22819fac74')
  }).then(res => {
    console.log(JSON.stringify(res, undefined, 2));
  });
});