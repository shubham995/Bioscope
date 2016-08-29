//$(document).ready(function(){
$("#modal_trigger").leanModal({top : 200, overlay : 0.6, closeButton: ".modal_close" });
$(function () {
  $("#user_name").empty();
  $("#passcode").empty();
  // Calling Login Form
  $("#login_form").click(function () {
    $(".social_login").hide();
    $(".user_login").show();
    return false;
  });
  //filling login form
  $("#log_me_in").click(function(){
    var user = $("#user_name").val();
    var pass = $("#passcode").val();
    if($("#user_name").val().length == 0){
      alert("Enter user name");
      return false;
    }
    else if($("#passcode").val().length == 0){
      alert("Enter password");
      return false;
    }
    else{
      $.post("/login",{username : user, password : pass },function(data,status){
        if(status) console.log(status);
        console.log(data);
        if(data == "grant"){
          $("#modal_trigger").hide();
          $("#logged_in_user").show();
          $("#logged_in_user").text(user);
          localStorage.setItem("username",user);
          $("#user_name").val(" ");
          $("#passcode").val("");
          console.log("closing modal");

        }
        else{
          alert("CHECK USERNAME AND PASSWORD");
        }
      })
      console.log('closing here');
       $('#modal').on('hidden.bs.modal', function () {
         window.alert('hidden event fired!');
       })
    }

  })

  // Calling Register Form
  $("#register_form").click(function () {
    $(".social_login").hide();
    $(".user_register").show();
    $(".header_title").text('Register');
    return false;
  });

  //REGISTERING NEW USER
  $("#register_user").click(function(){
    var user = $("#name_user").val();
    var full = $("#full_name").val();
    var mail = $("#mail").val();
    var passcode = $("#code").val();

    if($("#name_user").val().length == 0){
      alert("enter user name");
    }
    else if($("#full_name").val().length == 0){
      alert("enter user fullname");
    }
    else if($("#mail").val().length == 0){
      alert("enter email address");
    }
    //else if($("#mail").val().length != 0){

    //}
    else if($("#code").val().length == 0){
      alert("enter password");
    }
    else{
      var check_mail = $("#mail").val();
      if (validateEmail(check_mail)) {
        console.log("email is valid");
      } else {
        alert("email is not valid");
        return false;
      }
      //return false;
      $.post("/register",{username : user, fullname : full, email :  mail, pass : passcode},function(data,status){
        console.log("entered here");
        if(status) console.log(status);
        console.log(data);
        if(data == "grant"){
          $("#modal_trigger").hide();
          $("#logged_in_user").show();
          $("#logged_in_user").text(user);
          localStorage.setItem("username",user);
        }
        else{
          alert("USER ALREADY EXISTS");
        }
      })
    }

  })

  // Going back to Social Forms
  $(".back_btn").click(function () {
    $(".user_login").hide();
    $(".user_register").hide();
    $(".social_login").show();
    $(".header_title").text('Login');
    return false;
  });

})

//logout the user
$("#log_user_out").click(function(){
  localStorage.clear();
  $("#logged_in_user").hide();
  $("#modal_trigger").show();
})
//})

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
