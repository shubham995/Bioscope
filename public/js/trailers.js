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
  var trailers = $("#trailers");
  $("#more").hide();
  //var body = trailers.find("tbody");
  $.ajax({
    url : 'http://www.myapifilms.com/imdb/trailers?token=019d3a22-25e0-418b-97cd-a415da7de275&format=json&trailers=0&page=0',
    dataType : "jsonp",
    jsonpCallback:"callback",
    crossDomain : true,
    success : displayMovies
  })
  function displayMovies(response){
    console.log(response)
    var here = $("#here")
    //body.empty();
    var a = response.data.trailers[0].trailers;
    console.log("a :::"+a);
    var ul = $("<ul>")//attr({class: "embed-responsive embed-responsive-4by3"})
    for(i=0;i<20;i++){
        var string = a[i].videoURL+"/imdb/embed?autoplay=false&width=480";
        var embed1 = $("<iframe>").attr({src:string,width:"480",height:"270", allowfullscreen:"true", mozallowfullscreen:"true", webkitallowfullscreen:"true", frameborder:"1", scrolling:"no"})
        var li1 = $("<li>").attr("style","padding:2%").append(embed1); //
        i=i+1;
        var str = a[i].videoURL+"/imdb/embed?autoplay=false&width=480";
        var embed2 = $("<iframe>").attr({src:str,width:"480",height:"270", allowfullscreen:"true", mozallowfullscreen:"true", webkitallowfullscreen:"true", frameborder:"1", scrolling:"no"})
        var li2 = $("<li>").attr("style","padding:2%").append(embed2); //.attr("style","padding:2%")
        trailers.append(li1);
        trailers.append(li2);
    }
    //here.append(ul);


    $("#more").show();

  }
  //..on clicking more.......
  $("#more").click(function(){
    console.log("in MORE function")
    $("#more").prop('disabled',true);
    $.ajax({
      url : 'http://www.myapifilms.com/imdb/trailers?token=019d3a22-25e0-418b-97cd-a415da7de275&format=json&trailers=0&page=0',
      dataType : "jsonp",
      jsonpCallback:"callback",
      crossDomain : true,
      success : displayMoviesMore
    })
    function displayMoviesMore(res){
      var a = res.data.trailers[0].trailers;
      //console.log("a :::"+a);
      for(i=20;i<40;i++){
        var string = a[i].videoURL+"/imdb/embed?autoplay=false&width=480";
        var embed1 = $("<iframe>").attr({src:string,width:"480",height:"270", allowfullscreen:"true", mozallowfullscreen:"true", webkitallowfullscreen:"true", frameborder:"1", scrolling:"no"})
        var li1 = $("<li>").attr("style","padding:2%").append(embed1);
        i=i+1;
        var str = a[i].videoURL+"/imdb/embed?autoplay=false&width=480";
        var embed2 = $("<iframe>").attr({src:str,width:"480",height:"270", allowfullscreen:"true", mozallowfullscreen:"true", webkitallowfullscreen:"true", frameborder:"1", scrolling:"no"})
        var li2 = $("<li>").attr("style","padding:2%").append(embed2);
        trailers.append(li1);
        trailers.append(li2);
      }
      $('#more').prop('disabled', true);
    }
  })

})
