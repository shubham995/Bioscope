const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient

var url = 'mongodb://localhost:14000/project';

module.exports = {
  bookTicket : function(book){
    MongoClient.connect(url, function (err, db) {
      if (err)
      throw err;
      //assert.equal(null, err);
      console.log("Connected correctly to server");
      var booking = db.collection('booking');
      booking.insertOne({
        showtime : book.sTime,
        theatername : book.theaterName,
        movie : book.mName,
        ticketsQty : book.ticket_num,
        user : book.userName
      },function(err,status){
        if(err){
          //str = "not granted";
          console.log("error in inserting in db : "+err);
        }
        else{
          console.log("tickets booked");
        }
        db.close();
      })
    });
  },

  getBookingData : function(callback){
    MongoClient.connect(url, function (err, db) {
      if (err)
      throw err;
      //assert.equal(null, err);
      console.log("Connected correctly to server");
      var booking = db.collection('booking');
      booking.find().toArray(function(err,data){
        if(err) console.log("error : "+err);
        db.close();
        callback(data);
      })
    });
  }
}
