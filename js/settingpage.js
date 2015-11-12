var init_savings_balance = getSavingsBalance();
var init_chequing_balance = getChequingBalance();
var account_num = getAccountNum();

$(document).ready(function() {
  $("#newpin").addClass("disabled");
  $("#vkb-btn-enter").addClass("disabled");
  $("#vkb-btn-del").addClass("disabled");
  keyboardInput();
  var users = getSessionStorage();
  init_money(users);
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

function init_money(users){
  setSavingsBalance(init_savings_balance);
  setChequingBalance(init_chequing_balance);
  setAccountNum(account_num);
}

function getSavingsBalance(){
  var users = getSessionStorage();
  return users['savingsBalance'];
}

function getChequingBalance(){
  var users = getSessionStorage();
  return users['chequingBalance'];
}

function getAccountNum(){
  var users = getSessionStorage();
  return users['accountNumber'];
}

function setAccountNum(num){
  var users = getSessionStorage();
  users['accountNumber'] = num;
  updateSessionStorage(users);
  $("#accountnum").text(users['accountNumber']);
}

function setAccountPin(pin){
  var users = getSessionStorage();
  users['accountPin'] = pin;
  updateSessionStorage(users);
}

function setSavingsBalance(amt){
  var users = getSessionStorage();
  users['savingsBalance'] = amt;
  updateSessionStorage(users);
  $("#savingsBalance").text("$" + users['savingsBalance']);
}

function setChequingBalance(amt){
  var users = getSessionStorage();
  users['chequingBalance'] = amt;
  updateSessionStorage(users);
  $("#chequingBalance").text("$" + users['chequingBalance']);
}

function updateSessionStorage(user){
  sessionStorage.setItem("User", JSON.stringify(user));
}

function getSessionStorage(){
  return JSON.parse(sessionStorage.getItem('User'));
}

function validateInfo(){
  var userInfo = getSessionStorage();
  if(userInfo['accountPin'] == $("#oldpin").val() && $("#newpin1").val() == $("#newpin2").val()){
    setAccountPin($("#newpin1").val());
    location.href = "dash.html";
  }else{
    $("#feedback").text("Error. Either your initial pin was wrong or you did not type the same new pin.");
  }
}
