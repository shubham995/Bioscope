$(document).ready(function(){
  //keeping track of logged in user
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

  //. fetching data off BookMyShow's api BEGINS .

  $("#timings").hide();
  $("#banner").hide();
  $(".list").hide();
  $("#nearby").hide();
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
        $("#find").hide();
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
      $("#find").hide();
      putData(movie,data);
      $("#timings").show();
      $("#banner").show();
      $(".list").show();

    })



  })
//..fetching data off BookMyShow's api ENDS....///
//..making theatres' list
function putData(movie,data){
  var table = $("#shows");
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
  var head = table.find("thead");
  var body = table.find("tbody");
  head.empty();
  body.empty();
  var row = $("<tr>");
  var theater = $("<th>").append("Theater")
  row.append(theater);
  head.append(row);

  for(a of data.BookMyShow.arrEvent ){
    if(a.EventTitle == movie){
        var image = $("<img>").attr({src:a.BannerURL,class:'img-responsive'}).addClass("img-rounded")
        $("#banner").html(image);
        for(hall of a.arrVenues){
        var tr = $("<tr>");
        var italicHAll = $("<i>").attr("style","font-weight:800;color:black").append(hall.VenueName)
        var name = $("<td>").append(italicHAll);
        tr.append(name);
        body.append(tr);
      }
      //...adding TRAILER URL
      var headTrailer = $("<h4>").append("trailer")
      var hyperlink = $("<a>").attr({href:a.TrailerURL,target:'_blank'}).append(headTrailer);
      var trailer = $("<li>").append(hyperlink);
      watch.append(trailer);
      //..displaying MOVIE'S NAME
      var name = $("<h2>").attr("style","font-weight:900;color:darkmagenta").append(a.EventTitle);
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
} //..PUTDATA ENDS HERE

})
