const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {ToDo} = require('./models/todo');
var  {User} = require('./models/user');

var app = express();

app.get('/',(req,res)=>{
ToDo.find().then((doc)=>{
  res.send({doc});
});
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

app.delete('/todos/:id',(req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  };
  ToDo.findByIdAndRemove(id).then((todo)=>{
    if(!todo) return res.status(404).send();
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.patch('/todos/:id',(req,res)=>{
  var id = req.params.id;
  var body = _.pick(req.body,['text','completed']);
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  };
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }
  ToDo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
    if(!todo) return res.status(404).send();
    res.send({todo});
  }).catch((e)=>{
      res.status(400).send();
  });



});

app.listen(app.get('port'),()=>{
  console.log('Started on :'+app.get('port'));
});
