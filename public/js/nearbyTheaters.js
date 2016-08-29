
var hereMarker;

$("#find").click(function(){
  var an = {};
  $(this).prop('disabled',true);
  currentLocation()

})
function currentLocation() {
  navigator.geolocation.getCurrentPosition(function (pos) {
    hereMarker = new google.maps.Marker ({
      position : {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        fun : location(pos.coords.latitude,pos.coords.longitude)//console.log(pos.coords.latitude +"  " + pos.coords.longitude)
      },
      //map:  gMap,
      title :'me'
    });

    //gMap.panTo(hereMarker.getposition());
    //  obj.a = pos.coords.latitude; obj.b=pos.coords.longitude
    //  console.log(obj)//console.log("here ::::::" + pos.coords.latitude);
  })
  //return obj;

}
function location(a,b){
  console.log('a and b ::' + a+ "  "+b);

  //..FETCHING DATA AND DISPLAYING IT

  $.get("/theshow",{lat : a, long : b},function(data){

    var movie;
    var table = $("#neartheaters");
    var body =  table.find("tbody");
    var head = table.find("thead");
    var heading1 = $("<th>").append("THEATER")
    var heading2 = $("<th>").append("MOVIE")
    head.append(heading1);
    head.append(heading2);
    for(a of data.BookMyShow.arrEvent){
      for(b of a.arrVenues){
        if(parseFloat(b.Distance)<10){
          //console.log(b.VenueName);
          var tr = $("<tr>").hover(function(){
            $(this).css("background-color", "slategrey");
          },function(){
            $(this).css("background-color", "white");
          })
          var td = $("<td>").append(b.VenueName);
          var td2 = $("<td>").append(a.EventTitle);
          tr.append(td)
          tr.append(td2);
          body.append(tr);
        }
      }
    }
    $("#heading_of_page").text("THEATERS NEAR YOU")
    $("#find").hide();
    $("#hindi").hide();
    $("#english").hide();
    $("#heading").hide();
    $("#nearby").show();
    //table.append(body);
  })

}
// just hide these as we will not go to the theaters listing page ....and rest are already hidden
// $("#hindi").hide();
// $("#english").hide();
// $("#heading").hide();
