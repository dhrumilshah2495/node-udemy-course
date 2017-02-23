const {ObjectID} = require('mondodb');
const {mongoose} = require('./server/db/mongoose');
const {ToDo} = require('./server/models/todo');
var id = '123';
if(!ObjectID.isValid(id)){
  console.log('Id Is Invalid');
}
ToDo.findByIdAndRemove({id}).then((todo)=>{
  console.log(todos);
});
