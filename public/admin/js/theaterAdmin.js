$(document).ready(function(){
  var data = sessionStorage.getItem('admin');
  if(data != "admin"){
    window.location.href = "not.html";
  }
  else{
    var table = $("#theaterdata")
    var thead = table.find("thead");
    var tbody = table.find("tbody");

    $.get('/admintheater',function(data,status){
      console.log("data off db for theater : " + data);
      for(a of data){
        var tr = $("<tr>");
        var tdname = $("<td>").append(a.name);
        tr.append(tdname);
        for(i =0;i<6;i++){
          if(a.time[i] != undefined)
          var td = $("<td>").append(a.time[i]);
          else{
            var td = $("<td>").append(" ");
          }
          console.log("time here : "+a.time[i]);
          tr.append(td);
        }
        tbody.append(tr);
      }
    })

    var htr  = $("<tr>")//.attr('style','text-align:center');
    var th1 = $("<th>").append("Theater");
    htr.append(th1);
    var th2 = $("<th>").attr({'colspan':'6',style : "text-align:center"}).append("Timings");
    htr.append(th2);
    thead.append(htr);
  }
})
