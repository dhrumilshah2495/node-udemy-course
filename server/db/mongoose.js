var mongoose = require('mongoose');

mongoose.Promise = global.Promise;//we are configuring mongoose to use inbuild promise
mongoose.connect('mongodb://localhost:27017/ToDoApp');//creating moongose connection

module.exports = {mongoose};
