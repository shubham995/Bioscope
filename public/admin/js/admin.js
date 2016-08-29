$(document).ready(function(){
  var data = sessionStorage.getItem('admin');
  if(data != "admin"){
    window.location.href = "not.html";
  }
  else{
  var table = $("#userdata")
  var thead = table.find("thead");
  var tbody = table.find("tbody");
  //thead.empty();
  //tbody.empty();
  var delete_user;
  var htr  = $("<tr>");
  var th1 = $("<th>").append("#");
  var th2 = $("<th>").append("Username");
  var th3 = $("<th>").append("Full Name");
  var th4 = $("<th>").append("Email");
  var th5 = $("<th>").append("Delete");
  htr.append(th1);
  htr.append(th2);
  htr.append(th3);
  htr.append(th4);
  htr.append(th5);
  thead.append(htr);
  $.get('/maal',function(data){
    console.log("here " + data);
    var num = 1;
    for(a of data){
      var tr = $("<tr>");
      var td1 = $("<td>").append(num);
      var td2 = $("<td>").append(a.name);
      var td3 = $("<td>").append(a.fullname);
      var td4 = $("<td>").append(a.email);
      var link = $("<a>").attr({"href":"", }).append("Remove") //.addClass('btn btn-link')
      var td5 = $("<td>").attr({'id' : a.name, "class":'abcd'}).append(link);
      tr.append(td1);
      tr.append(td2);
      tr.append(td3);
      tr.append(td4);
      tr.append(td5);
      tbody.append(tr);
      num = num + 1;
    }

    $(".abcd").click(function(){
      console.log("hey yo");
      console.log("id : " + $(this).attr('id'));
      delete_user =  $(this).attr('id');//alert("yo");
      console.log(delete_user);
      removeFromDb(delete_user);
    })
  })
//function to be used for deleting user form db
function removeFromDb(user){
  $.get('/removeuser',{remove : user}, function(data,status){
    console.log("status : "+status);
    console.log("data after removing : "+data);

  })
}

}//else ends

})
