require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT;

//Midleware
app.use(bodyParser.json());

//Todo Handlers
app.post('/todos', authenticate, (req,res) => {
  const todo = new Todo({ 
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save()
    .then(doc => res.send(doc), e => res.status(400).send(e)
  );
});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then(todos => 
    res.send({todos}), e => res.status(400).send(e)
  );
});

app.get('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  
  if(!ObjectId.isValid(id)){
    return res.status(404).send();
  }
  
  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then(todo => {
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo});
  }, e => res.status(400).send(e));
});

//ES5
// app.delete('/todos/:id', authenticate, (req, res) => {
//   const id = req.params.id;

//   if(!ObjectId.isValid(id)){
//     return res.status(404).send();
//   }

//   Todo.findOneAndRemove({
//     _id: id,
//     _creator: req.user._id
//   }).then(todo => {
//     if(!todo){
//       return res.status(404).send();
//     }

//     res.send({todo});
//   }, e => res.status(400).send(e));
// });

//ES6
app.delete('/todos/:id', authenticate, async (req, res) => {
  const id = req.params.id;

  if(!ObjectId.isValid(id)){
    return res.status(404).send();
  }

  try{
    const todo = await Todo.findOneAndRemove({
      _id: id,
      _creator: req.user._id
    });
    
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});

  }catch(e){
    res.status(400).send(e);
  }
});

app.patch('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  //It avoids the user is able to update all the obj properties
  const body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectId.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body},{new: true}).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo});
  }).catch(e => res.status(400).send())
});

//User Handlers
//Create user
//ES5
// app.post('/users', (req, res) => {
//   //It avoids the user is able to update all the obj properties
//   const body = _.pick(req.body, ['email', 'password']);
//   const user = new User(body);
  
//   user.save().then(() => {
//     return user.generateAuthToken();
//   }).then(token => {
//     res.header('x-auth',token).send(user);
//   }).catch(e => res.status(400).send(e) );
// });

//ES6
app.post('/users', async (req,res) => {
  //It avoids the user is able to update all the obj properties
  try{
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    await user.save();
    const token = await user.generateAuthToken();
    res.header('x-auth',token).send(user);
  } catch(e){
    res.status(400).send(e);
  }
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});


//Login
//ES5
// app.post('/users/login', (req, res) => {
//   const body = _.pick(req.body, ['email', 'password']);

//   User.findByCredentials(body.email, body.password).then(user => {
//     return user.generateAuthToken().then(token => {
//       res.header('x-auth',token).send(user);
//     })
//   }).catch(e => {
//     res.status(400).send();
//   });
// });

//ES6
app.post('/users/login', async (req, res) => {
  try{
    const body = _.pick(req.body, ['email', 'password']);
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
    res.header('x-auth',token).send(user);
  } catch (e) {
    res.status(400).send();
  }
});

//Logout
//ES5
// app.delete('/users/me/token', authenticate, (req, res) => {
//   req.user.removeToken(req.token).then(() => {
//     res.status(200).send();
//   }), () => {
//     res.status(400).send();
//   }
// });

//ES6
app.delete('/users/me/token', authenticate, async (req, res) => {
  try{
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

//Start to listen the server
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};