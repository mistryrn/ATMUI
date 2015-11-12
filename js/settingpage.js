$(document).ready(function() {
  $("#newpin").addClass("disabled");
  $("#vkb-btn-enter").addClass("disabled");
  $("#vkb-btn-del").addClass("disabled");
  keyboardInput();
});

var field_num_focus = 1;

function keyboardInput() {
  $(document).on('click', '.vkb-btn', function(e) {
    e.preventDefault();
    var input;
    if (field_num_focus == 1) {
      input = $('#oldpin');
    } else if(field_num_focus == 2) {
      input = $('#newpin1');
    } else if(field_num_focus == 3){
      input = $("#newpin2");
    }
    if (e.target.id !== "vkb-btn-del" && e.target.id !== "vkb-btn-enter" && input.val().length < 4) {
      input.val(input.val() + e.target.text);
    } else if (e.target.id === "vkb-btn-del") {
      input.val(input.val().slice(0,-1));
      $("#vkb-btn-enter").addClass("disabled");
      if (input.val().length === 0){
        $("#vkb-btn-del").addClass("disabled");
      }
    } else if (e.target.id === "vkb-btn-enter") {
      if (field_num_focus == 1) {
        $("#newpindiv").removeClass("disabled");
        $("#newpin1").focus();
        field_num_focus ++;
      } else if(field_num_focus == 2) {
        $("#newpindiv2").removeClass("disabled");
        $("#newpin2").focus();
        field_num_focus ++;
      }else if(field_num_focus == 3){
        validateInfo();
      }
    }
    if (input.val().length > 0) {
      $("#vkb-btn-del").removeClass("disabled");
    }
    if (input.val().length == 4) {
      $("#vkb-btn-enter").removeClass("disabled");
    }
  });
}

function validateInfo(){
  var userInfo = JSON.parse(sessionStorage.getItem('User'));
  if(userInfo['accountPin'] == $("#oldpin").val() && $("#newpin1").val() == $("#newpin2").val()){
    userInfo['accountPin'] = $("#newpin1").val();
    sessionStorage.setItem("User", JSON.stringify(userInfo));
    location.href = "dash.html";
  }

}
