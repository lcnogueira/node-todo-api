const {ObjectId} = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

const id = '5a9d4688eafc177fa17aad211';

if(!ObjectId.isValid(id)){
  console.log('ID not valid');
}

Todo.find({
  _id: id
}).then(todos => {
  console.log('Todos', todos);
});

Todo.findOne({
  _id: id
}).then(todo => {
  console.log('Todo', todo);
});

Todo.findById(id).then(todo => {
  if(!todo){
    return console.log('Id not found');
  }
  console.log('Todo BY Id', todo);
}).catch(e => console.log(e));
