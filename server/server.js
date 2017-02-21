var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {ToDo} = require('./models/ToDo');
var  {User} = require('./models/User');

var app = express();

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
  console.log('Started on :'+app.get('port')');
});
//var Schema = moongoose.Schema;
// var toDoSchema = new Schema({
//   text:{
//     type:String
//   },completed:{
//     type:Boolean
//   },completedAt:{
//     type:Number
//   }
// });
//creating a moongose model
// //adding data to ToDoApp db.
// var newToDo = new ToDo({
//   text:"learn node",
//   completed:false,
//   completedAt:2017
// });
// newToDo.save().then((doc)=>{
//   console.log('Saved: '+JSON.stringify(doc,undefined,2));
// },(e)=>{
//   console.log('Unable to Save...');
// });//saving to db...
