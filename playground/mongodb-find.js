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

  db.collection(Users).find({name: 'Andrew'}).toArray().then((docs) => {
    console.log('Users:');
    console.log(JSON.stringify(docs, undefined, 2));
  }, err => {
    console.log('Unable to fetch Users', err);
  });


  // db.collection(Todos).find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, err => {
  //   console.log('Unable to fetch todos', err);
  // });

  // db.collection(Todos).find({
  //     _id: new ObjectID('5a9aa3b5174ac621271a41d7')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, err => {
  //   console.log('Unable to fetch todos', err);
  // });

  // client.close();
});