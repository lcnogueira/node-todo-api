const {ObjectId} = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then(res => {
//   console.log(res);
// });

// Todo.findOneAndRemove({})
// Todo.findByIdAndRemove(id)

// Todo.findOneAndRemove({_id: '5a9ed3cee5714d0e1d2069c2'}).then(todo => {
//   console.log(todo);
// });

Todo.findByIdAndRemove('5a9ed3cee5714d0e1d2069c2').then(todo => {
  console.log(todo);
});

