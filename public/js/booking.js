
$(document).ready(function(){
    //.. KEEPING TRACK OF LOGGED IN USER
    var logged_user = localStorage.getItem("username");
    console.log("logged user : "+logged_user);
    if(logged_user != undefined){
      $("#modal_trigger").hide();
      $("#logged_in_user").show();
      $("#logged_in_user").text(logged_user);
    }
    else{
      $("#logged_in_user").hide();
    }


    // these 4 variables contain the time of show , theater name , movie name and number of tickets to be booked.
    var showtime;
    var theater_name;
    var name_of_movie;
    var num_of_seats;

  //. fetching data off BookMyShow's api BEGINS .
  $("#timings").hide();
  $("#banner").hide();
  $(".list").hide();
  $(".theform").hide();
  $(".carddetails").hide();
  $("#paise").hide();
  var hindiTable = $("#hindi");
  var hindiTableHead = hindiTable.find("thead")
  var hindiTableBody = hindiTable.find("tbody")

  var englishTable = $("#english");
  var englishTableHead = englishTable.find("thead");
  var englishTableBody = englishTable.find("tbody");

  $.get("/myshow",function(data){
    //..setting up tables' heads.

    hindiTableHead.empty();
    hindiTableBody.empty();
    englishTableHead.empty();
    englishTableBody.empty();
    var row = $("<tr>");
    var hindiHeading = $("<th>").append("HINDI MOVIES");
    row.append(hindiHeading);
    hindiTableHead.append(row);

    var englishRow = $("<tr>");
    var englishHeading = $("<th>").append("ENGLISH MOVIES");
    englishRow.append(englishHeading);
    englishTableHead.append(englishRow);

    //..PUTTING DATA IN TABLE BEGINS

    for(a of data.BookMyShow.arrEvent){

      if(a.Language == 'Hindi'){
        console.log(a.EventTitle);
        var here=function(){
          alert ("we r here");
        }
        var tr = $("<tr>");
        var hindiLink = $("<a>").attr({href:'#',style:"color:black;font-weight:900"}).append(a.EventTitle);
        var hindiTitle = $("<td>").addClass("hin").append(hindiLink);
        tr.append(hindiTitle);
        hindiTableBody.append(tr);
        //console.log("class : "+$("a").attr('class'))
      }
      if(a.Language == 'English'){
        console.log(a.EventTitle);

        var tr = $("<tr>");
        var link = $("<a>").attr({href:'#',style:"color:black;font-weight:900"}).append(a.EventTitle);
        var title = $("<td>").addClass("eng").append(link);
        tr.append(title);
        englishTableBody.append(tr);

      }
    }

    //..FUNCTIONS FOR WHEN MOVIES' ARE CLICKED

    $(".hin").click(function(){
      var movie = $(this).text();
      //alert("in this func :"+movie);
      $.get("/myshow",function(data){
        $("#hindi").hide();
        $("#english").hide();
        $("#heading").hide();
        putData(movie,data);
        $("#timings").show();
        $("#banner").show();
        $(".list").show();
      })
    })
    $(".eng").click(function(){
      var movie = $(this).text();
      //alert("for eng "+movie);
      $("#hindi").hide();
      $("#english").hide();
      $("#heading").hide();
      putData(movie,data);
      $("#timings").show();
      $("#banner").show();
      $(".list").show();

    })
  })

  //..fetching data off BookMyShow's api ENDS....///
  //..making theatres' list
  function putData(movie,data){
    //$("#bookticket").hide();
    var genre = $("#genre");
    var film = $("#film");
    var watch = $("#watch");
    var h4 = $("<h4>").append("Watch")
    var link = $("<li>").append(h4);
    watch.append(link);
    var li = $("<li>").append("GENRE :")
    genre.append(li);
    var cast = $("#cast")
    var names = $("<li>").append("CAST :");
    cast.append(names);
    var length = $("#length")
    var len = $("<li>").append("LENGTH :");
    length.append(len);

    //..ADDING MOVIES INFORMATION
    for(a of data.BookMyShow.arrEvent ){
      if(a.EventTitle == movie){
        var image = $("<img>").attr({src:a.BannerURL,class:'img-responsive'}).addClass("img-rounded")
        $("#banner").html(image);

        //..making resquest to get theater data from db
        $.get("/theaterandtime",function(data){
          console.log(data);
          var booking = $("#booking");

          //..ADD THEATERS'S NAME AND TIME TO LIST
          for (a of data){
            var time = $("<ul>").attr("class","list-inline");
            var h4 = $("<h4>").attr("style","color:saddlebrown;font-weight:600").append(a.name);
            var li1 = $("<li>").append(h4);
            console.log("theater :"+a.name);
            time.append(li1);
            for( b of a.time){
              console.log("time : "+b); //href:"#",datatoggle:"modal", datatarget:"#myModal"
              var link = $("<a>").attr({"href":"#","data-toggle":"modal","data-target":'#myModal',class:a.name}).append(b);
              var li2 = $("<li>").attr({style:"color:peru;font-weight:600",class:"timeitems"}).append(link);
              console.log("class :"+link.attr("class"));
              time.append(li2);
            }
            booking.append(time);
          }
          //FUNCTION TO GET THE CLICKED SHOWTIME ....TO BE USED FOR ADDING THE BOOKING SHOWTIME IN DB
          $(".list-inline a").click(function(){
            showtime = $(this).text();
            theater_name = $(this).attr("class");
            console.log("moviename ::: "+ $(".show_name").text());
            name_of_movie = $(".show_name").text()
            //console.log("theatername :::: "+$(this).attr("class"));
            //console.log("showtime : "+showtime);
          })

        })

        //...adding TRAILER URL
        var headTrailer = $("<h4>").attr("style","text-decoration:underline").append("TRAILER")
        var hyperlink = $("<a>").attr({href:a.TrailerURL,target:'_blank'}).append(headTrailer);
        var trailer = $("<li>").append(hyperlink);
        watch.append(trailer);

        //..displaying MOVIE'S NAME
        var name = $("<h2>").attr({"style":"font-weight:900;color:darkmagenta",class:"show_name"}).append(a.EventTitle);
        var italic = $("<i>").append(name);
        var filmName = $("<li>").append(italic); //name
        var censor = $("<h3>").attr("style","color:crimson;font-weight:900").append(a.EventCensor);
        var addCensor = $("<li>").append(censor);
        film.append(filmName);
        film.append(addCensor);

        //..displaying movie's length
        var movieLength = $("<li>").append(a.Length);
        length.append(movieLength);
        //.. displaying genres
        for(j=0;j<3;j++){
          var list = $("<li>").append(a.GenreArray[j]);
          genre.append(list);
        }
        //.. displaying actors' name
        var actors = a.Actors.split(",");
        for(i=0;i<4;i++){
          var link = $("<a>").attr({href:"https://en.wikipedia.org/wiki/"+actors[i],target:"_blank"}).append(actors[i]);
          var li = $("<li>").append(link);
          cast.append(li);
        }
      }
    }
  }
  //..PUTDATA ENDS HERE

  //..FUNCTIONS DEALING WITH TICKET BOOKING BEGIN evrything's working fine ....
  //In last function, where card details are added.....just add all the summed up details to database.
  // 1. add no. of tickets
  $("#getform").click(function(){
    num_of_seats = $("#num").val();
    if(num_of_seats == 0){
      alert("Enter number of tickets");
      return;
    }
    else{
      var logged_user = localStorage.getItem("username");
      if(logged_user != undefined){
        num_of_seats = $("#num").val();
        var amt = num_of_seats * 200;
        $("#modal-body").hide();
        $(".theform").show();
        $("#bookhere").hide();
        $("#paise").show();
        $("#rupees").text(amt);
        console.log('time :::: '+ showtime);
        console.log("theater_name :::::"+theater_name);
      }
      else {
        alert("LOG IN FIRST");
        return false;
      }

    }
  })
  // 2. add user details
  $("#card").click(function(){
    if($("#fullname").val().length == 0){
      alert("Enter your name");
      return false;
    }
    else if($("#phone").val().length == 0 ){
      alert("Enter your phone no.");
      return false;
    }
    else if($("#email").val().length == 0){
      alert("Enter your email");
      return false;
    }
    else{
      //check phone no. is an integer
      var check_phone = $("#phone").val();
      if(check_phone % 1 !== 0){
        alert("invalid phone number");
        return false;
      }

      ///here email check
      var check_mail = $("#email").val();
      if (validateEmail(check_mail)) {
        console.log("email is valid");
      } else {
        alert("email is not valid");
        return false;
      }

      $(".carddetails").show();
      $(".theform").hide();
    }
    //console.log("num val :::" +$("#num").val() ); //no. of tickets retained here
  })

  // 3. add card details
  $("#pay").click(function(){
    if($("#cardholder").val().length == 0){
      alert("Enter cardholder's name");
      return;
    }
    else if($("#cardnum").val().length == 0){
      alert("Enter card number");
      console.log("num of tickets : "+$("#num").val());
      console.log("fullname : "+$("#fullname").val());
      console.log("phone : "+$("#phone").val());
      console.log("email : "+$("#email").val());
      console.log("cardholder : "+$("#cardholder").val())
      return;
    }
    else if($("#expdate").val().length == 0){
      alert("Enter expiration date");
      console.log("num of tickets : "+$("#num").val());
      console.log("fullname : "+$("#fullname").val());
      console.log("phone : "+$("#phone").val());
      console.log("email : "+$("#email").val());
      console.log("cardholder : "+$("#cardholder").val())
      console.log("cardnum : "+$("#cardnum").val())
      return;
    }
    else if($("#security").val().length == 0){
      alert("Enter Security code");

      console.log("num of tickets : "+$("#num").val());
      console.log("fullname : "+$("#fullname").val());
      console.log("phone : "+$("#phone").val());
      console.log("email : "+$("#email").val());
      console.log("cardholder : "+$("#cardholder").val())
      console.log("cardnum : "+$("#cardnum").val())
      console.log("expdate : "+$("#expdate").val())
      return;
    }
    else{
      //check card number
      var check_card = $("#cardnum").val();
      if(check_card % 1 !== 0){
        alert("invalid card number");
        return false;
      }
      //CHECK DATE
      var date = $("#expdate").val();
      var ans = Date.parse(date);
      console.log("ans :: "+ans);
      if(ans == NaN){
        alert("Invalid Date");
        return false;
      }


      console.log("ANS ::: "+ans);
      if(!(ans)){
        alert("Invalid date");
        return false;
      }
      console.log('FINALCHECK time :::: '+ showtime);
      console.log("FINALCHECK theater_name :::::"+theater_name);
      console.log("FINALCHECK movie_name :::::"+name_of_movie);
      console.log("FINALCHECK numtickets :::::"+num_of_seats);

      //send a post request to enter the booking details too database
      var the_logged_user = localStorage.getItem("username");
      $.post('/booking',{time : showtime, tName : theater_name, movie : name_of_movie, seats : num_of_seats, user : the_logged_user},
        function(data,status){
          if(status) console.log(status);
          console.log(data);
                alert('Your Tickets Are Successfully Booked!');
      })
    }

  })



})
