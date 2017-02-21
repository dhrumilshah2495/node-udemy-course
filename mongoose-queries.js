const {ObjectID} = require('mondodb');
const {mongoose} = require('./server/db/mongoose');
const {ToDo} = require('./server/models/todo');
var id = '123';
if(!ObjectID.isValid(id)){
  console.log('Id Is Invalid');
}
ToDo.findById(id).then((todo)=>{
  if(!todo){
    return console.log('Id Not Found');
  }
  console.log('ToDo By Id: '+todo);
},(e)=>{
  console.log(e);
});
