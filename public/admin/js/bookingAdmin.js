$(document).ready(function(){
  var data = sessionStorage.getItem('admin');
  if(data != "admin"){
    window.location.href = "not.html";
  }
  else{
  var table = $("#bookingdata")
  var thead = table.find("thead");
  var tbody = table.find("tbody");
  var htr = $("<tr>");
  var th1 = $("<th>").append("Theater");
  var th2 = $("<th>").append("Time");
  var th3 = $("<th>").append("Movie");
  var th4 = $("<th>").append("Persons");
  var th5 = $("<th>").append("User");
  htr.append(th1);
  htr.append(th2);
  htr.append(th3);
  htr.append(th4);
  htr.append(th5);
  thead.append(htr);
  $.get('/bookingdata',function(data,status){
    console.log("data : :" + data);
    for(a of data){
      var tr = $("<tr>");
      var td1 = $("<td>").append(a.theatername);
      var td2 = $("<td>").append(a.showtime);
      var td3 = $("<td>").append(a.movie);
      var td4 = $("<td>").append(a.ticketsQty);
      var td5 = $("<td>").append(a.user);
      tr.append(td1);
      tr.append(td2);
      tr.append(td3);
      tr.append(td4);
      tr.append(td5);
      tbody.append(tr);
    }
  })
}//else ends

})
