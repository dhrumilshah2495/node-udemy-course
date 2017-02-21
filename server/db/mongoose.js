var mongoose = require('mongoose');

mongoose.Promise = global.Promise;//we are configuring mongoose to use inbuild promise
mongoose.connect('mongodb://admin:root@ds157459.mlab.com:57459/mlabdatabase');//creating moongose connection
//mongodb://localhost:27017/ToDoApp
module.exports = {mongoose};
