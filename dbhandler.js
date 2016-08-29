const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient

var url = 'mongodb://localhost:27017/project';

module.exports = {
  getData : function(callback){
    MongoClient.connect(url, function (err, db) {
      if (err)
      throw err;
      //assert.equal(null, err);
      console.log("Connected correctly to server");
      var movie = db.collection('theater');
      movie.find().toArray(function (err,data) {
        if(err){
          console.log("error in retrieving data from db : "+err);
        }
        else{
          console.log("theater list and timings : ");
          for(a of data){
            console.log("data of theater and time :" + a);
          }
        }
        db.close();
        callback(data);
      })
    });
  }
}
