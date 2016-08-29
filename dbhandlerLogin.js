const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient

var url = 'mongodb://localhost:27017/project';

module.exports = {
  addUser : function(user_object,callback){
    MongoClient.connect(url, function (err, db) {
      if (err)
      throw err;

      console.log("Connected correctly to server");
      var userDetails = db.collection('userDetails');
      console.log(user_object.user);
      userDetails.find({name : user_object.user}).toArray(function(err,data){
        if(err) console.log(err);
        var str;
        if(data.length == 1){
          console.log("user already exists");
          str = "not granted";
        }
        else{
          str = "granted";
          userDetails.insertOne({
            name : user_object.user,
            fullname : user_object.full,
            email : user_object.mail,
            password : user_object.passcode
          },function(err,status){
            if(err){
              //str = "not granted";
              console.log("error in inserting in db : "+err);
            }
            else{
              console.log("new user : " +status );
            }

          })
        }
        console.log("string in dblogin : "+str);
        callback(str);
        db.close();
      })
    });
  },

  userLogin : function(user_object,callback){
    MongoClient.connect(url, function (err, db) {
      if (err)
      throw err;

      console.log("Connected correctly to server");
      var userDetails = db.collection('userDetails');
      console.log(user_object.user_name + "   " + user_object.pass);
      userDetails.find({name : user_object.user_name}).toArray(function(err,data){
        if(err) console.log(err);
        var string;
        if(data.length == 1){
          for(a of data){
            console.log(a);
            if(a.password == user_object.pass){
                console.log("password : "  + a.password);
                console.log("access granted to : "+user_object.user_name);
                string = "granted";
            }
            else{
              string = "not granted";
            }
          }
        }
        else if(data.length == 0){
          console.log("sign up");
          string = "not granted";
        }
        callback(string);
        db.close();
      })

  });
},

  senddata : function(callback){
    MongoClient.connect(url, function (err, db) {
      if (err)
      throw err;

      console.log("Connected correctly to server");
      var userDetails = db.collection('userDetails');
      //console.log(user_object.user_name + "   " + user_object.pass);
      userDetails.find().toArray(function(err,data){
        if(err) console.log("err in retrieving dara");

        callback(data);
        db.close();

      })
    })
  },
  removeUser : function(username,callback){
    MongoClient.connect(url, function (err, db) {
      if (err)
      throw err;

      console.log("Connected correctly to server");
      var userDetails = db.collection('userDetails');
      //console.log(user_object.user_name + "   " + user_object.pass);
      userDetails.remove({name : username})//.toArray(function(err,data){
        // if(err) console.log("err in retrieving dara");
        //
        // callback(data);
        // db.close();

      //})
    })
  }


}
