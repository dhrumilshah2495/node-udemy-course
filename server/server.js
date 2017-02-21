var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
  var {ToDo} = require('./models/todo');
  var  {User} = require('./models/user');

var app = express();

app.get('/',(req,res)=>{
  res.send('Welcome to My App');
});

app.use(bodyParser.json());

app.set('port',process.env.PORT || 3000);

app.post('/todos',(req,res)=>{
  var todo = new ToDo({text:req.body.text});
  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos/:id',(req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  ToDo.findById(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  });
  res.send(req.params);
});

app.listen(app.get('port'),()=>{
  console.log('Started on :'+app.get('port'));
});
