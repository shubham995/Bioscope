var express = require('express');
//var cors = require("cors");
var app = express();
var http = require('http');
const db = require("./dbhandler")
const dbl = require("./dbhandlerLogin");
const dbB = require("./dbhandlerBooking");

var bodyParser = require('body-parser');
const util = require('util');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/',express.static('./public'));


app.get('/myshow', function (req, res) {

  http.get('http://data-in.bookmyshow.com/?cmd=GETEVENTLIST&f=json&cc&et=MT&dt&lt=28.7312&lg=77.1212&rc&sr&t=67x1xa33b4x422b361ba', function(response) {

    // Continuously update stream with data
    var body = '';
    response.on('data', function(d) {
      body += d;
    });
    response.on('end', function() {

      // Data reception is done, do whatever with it!
      var parsed = JSON.parse(body);
      //console.log(parsed);
      /*for(a of parsed.BookMyShow.arrEvent){
      //if(a.Language == 'Hindi' ||a.Language == 'English' ||a.Language == 'English (7D)'||a.Language == 'English (4D)' )
      console.log(a.EventTitle);
    }*/
    res.send(parsed);
  });
});

});



app.get('/theaterandtime',function (req,res) {
  db.getData(function (result) {
    console.log("theater data : "+result);
    res.send(result);
  })
})

// adding user details to db (userDetails db)
app.post('/register',function(req,res){
  var userObject = {};
  userObject.user = req.body.username;
  userObject.full = req.body.fullname;
  userObject.mail = req.body.email;
  userObject.passcode = req.body.pass;
  dbl.addUser(userObject,function(result){
    console.log("result after signing up : "+result );
      if(result == "granted"){
        res.send("grant");
      }
      else {
        res.send("not granted");
    }
  });

})

// USER logging in
app.post('/login',function(req,res){
  var user = {};
  user.user_name = req.body.username;
  user.pass = req.body.password;
  dbl.userLogin(user,function(result){
    console.log("received form dblogin : "+result);
    if(result == "granted"){
      res.send("grant");
    }
    else{
      res.send("not granted");
    }
  });
})

//ticket BOOKING
app.post('/booking',function(req,res){
  var book = {};
  book.sTime = req.body.time;
  book.theaterName = req.body.tName;
  book.mName = req.body.movie;
  book.ticket_num = req.body.seats;
  book.userName = req.body.user;

  dbB.bookTicket(book);
  res.end();
})

// calling bookmyshow api to get nearby theaters
app.get('/theshow', function (req, res) {
var a = req.query.lat; //latitude
var b = req.query.long //longitude
console.log("in server : "+a  + "    " + b);
   http.get('http://data-in.bookmyshow.com/?cmd=GETEVENTLIST&f=json&cc&et=MT&dt&lt='+a+'&lg='+b+'&rc&sr&t=67x1xa33b4x422b361ba', function(response) {

     // Continuously update stream with data
     var body = '';
     response.on('data', function(d) {
       body += d;
     });
     response.on('end', function() {

       // Data reception is done, do whatever with it!
       var parsed = JSON.parse(body);
       //console.log(parsed);
       /*for(a of parsed.BookMyShow.arrEvent){
       //if(a.Language == 'Hindi' ||a.Language == 'English' ||a.Language == 'English (7D)'||a.Language == 'English (4D)' )
       console.log(a.EventTitle);
     }*/
     console.log(parsed);
     res.send(parsed);
   });
 });


});

//FUNCTION FOR HANDLING ADMINISTRATIVE LOGIN
app.get("/admin",function(req,res){
  res.sendFile('index.html',{root :'./public/admin' });
})
app.get("/admin/tables.html",function(req,res){
  res.sendFile('not.html',{root : './public/admin'});
})
 app.post('/admin/admintables',function(req,res){
    var userName = req.body.username;
    var passcode = req.body.password;
    console.log(userName + " " +passcode);
    if(userName == "admin"){
      if(passcode == "admin"){
         //console.log("sending tables for admin");
         userName = " ";
         passcode = " ";
         res.send("authenticate")
         //console.log("sent");
         //res.sendFile('tables.html',{root : './public/admin'});
      }
      else{
       res.send("not authenticated");
      }
    }
    else {
      res.send("not authenticated");
    }
    //res.end();
   //console.log("in /admin");
//res.sendFile('tables.html',{root : './public/admin'});
//res.end();
 })

app.get('/maal',function(req,res){
  dbl.senddata(function(result){
    console.log( result);
    res.send(result);
  })
  //res.end();
})
app.get('/removeuser',function(req,res){
  var name = req.query.remove;
  dbl.removeUser(name);
  res.end();
})
app.get('/admintheater',function (req,res) {
   db.getData(function (result) {
     console.log("theater data : "+result);
     res.send(result);
   })
 })

app.get('/bookingdata',function(req,res){
  dbB.getBookingData(function(result){
    console.log("result : "+result);
    res.send(result);
  })
})

app.listen(4000,function(){
  console.log("started at 4000")
})
