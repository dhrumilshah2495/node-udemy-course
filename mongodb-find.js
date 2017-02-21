//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb server');
  // db.collection('Todos').find({
  //   _id : new ObjectID("58a50cbe08faac20c8221557");
  // }).toArray().then((docs)=>{
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(error)=>{
  //   console.log('unable to fetch',error);
  // });

  db.collection('Users').find().count().then((count)=>{
    console.log(`Count: ${count}`)
  },(error)=>{
    console.log('unable to fetch',error);
  });



  //db.close();
});
