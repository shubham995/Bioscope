$(document).ready(function(){


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

  //.. function for searching movie using imdb api BEGINS here
  $("#submit").click(function () {

    var movie = $("#movieTitle").val()
    var table = $("#results");
    var tbody = table.find("tbody");
    var thead = table.find("thead");
    thead.attr("style","background-color:yellow")
    //alert("search for :"+movie);
    if(!movie){
      alert("Enter Movie's Name");
      return;
    }
    $.ajax({
      url : "http://www.myapifilms.com/imdb/idIMDB?title="+movie+"&token=019d3a22-25e0-418b-97cd-a415da7de275&format=json&language=en-us&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=2&exactFilter=0&limit=3&forceYear=0&trailers=0&movieTrivia=0&awards=0&moviePhotos=0&movieVideos=0&actors=0&biography=0&uniqueName=0&filmography=0&bornAndDead=0&starSign=0&actorActress=0&actorTrivia=0&similarMovies=0&adultSearch=0&goofs=0&quotes=0&fullSize=0&companyCredits=0",
      dataType : "jsonp",
      jsonpCallback:"callback",
      crossDomain : true,
      success : displayMovies
    })

    function displayMovies(film){
      //console.log(film.data.movies[0]);

      //.. Aadding table head BEGINS
      thead.empty();
      tbody.empty();
      var row = $("<tr>");
      //var italicTitle = $("<i>");
      var titleh1 = $("<h1>").attr("style","font-weight:900").append("Title");
      //italicTitle.append(titleh3)
      var name = $("<th>").append(titleh1);
      var ploth1 = $("<h1>").attr("style","font-weight:900").append("Plot");
      var story = $("<th>").append(ploth1);
      var posterh1 = $("<h1>").attr("style","font-weight:900").append("Poster");
      var poster = $("<th>").append(posterh1);
      row.append(name);
      row.append(story);
      row.append(poster);
      thead.append(row);
      //..addition of table head ENDS

      //..rendering obtained data in table BEGINS
      for(i=0;i<3;i++){
        var title = film.data.movies[i].title;
        var plot = film.data.movies[i].simplePlot;
        var posterUrl = film.data.movies[i].urlPoster;
        var imdbUrl = film.data.movies[i].urlIMDB;
        //console.log( plot );

        var tr = $("<tr>");
        var italic = $("<i>").append(title)
        var titleLink = $("<a>").attr({href:imdbUrl,target:'_blank'}).append(italic);
        var titleTd = $("<td>").append(titleLink);
        var plotTd = $("<td>").append(plot);
        var img = $("<img>").attr("src",posterUrl);
        var posterTd = $("<td>").append(img)
        tr.append(titleTd);
        tr.append(plotTd);
        tr.append(posterTd);
        tbody.append(tr);

      }
      //..rendering of data in table ENDS.

    }

  })
  //..function for searching movie using imdb api ENDS here


})
