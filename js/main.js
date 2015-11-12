var init_savings_balance = getSavingsBalance();
var init_chequing_balance = getChequingBalance();
var account_num = getAccountNum();
var account_num_focus = true;

$(document).ready(function() {
  $("#completionAlert").hide();
  $("#accnum").focus();
  $("#pin").hide();
  $("#vkb-btn-enter").addClass("disabled");
  $("#vkb-btn-del").addClass("disabled");
  keyboardInput();
  var users = getSessionStorage();
  init_money(users);
});

// Virtual Keyboard Stuff ===============================

// disable keyboard input
$(document).on('keydown',function(e) {
  e.preventDefault();
});

function keyboardInput() {
  $(document).on('click', '.vkb-btn', function(e) {
    e.preventDefault();
    var input, maxlen;
    if (account_num_focus) {
      input = $('#accnum');
      maxlen = 16;
    } else {
      input = $('#numpin');
      maxlen = 4;
    }
    if (e.target.id !== "vkb-btn-del" && e.target.id !== "vkb-btn-enter" && input.val().length < maxlen) {
      input.val(input.val() + e.target.text);
    } else if (e.target.id === "vkb-btn-del") {
      input.val(input.val().slice(0,-1));
      $("#vkb-btn-enter").addClass("disabled");
      if (input.val().length === 0)
        $("#vkb-btn-del").addClass("disabled");
    } else if (e.target.id === "vkb-btn-enter") {
      if (account_num_focus) {
        $("#pin").show();
        $("#numpin").focus();
        account_num_focus = false;
      } else {
        validateAccount();
        location.href = 'dash.html';
      }
    }
    if (input.val().length > 0) {
      $("#vkb-btn-del").removeClass("disabled");
    }
    if (input.val().length == maxlen) {
      $("#vkb-btn-enter").removeClass("disabled");
    }
  });
}

// Virtual Keyboard Stuff Ends ==========================

function validateAccount(){
  var accountnumber = $("#accnum").val();
  var accountpin = $("#numpin").val();
  //constraining the length of the account number to be 16 characters long, numeric and greater than 0
  if(validAccNum(accountnumber) && validPin(accountpin)){
    $("input[id=submitAccountInfo]").prop("disabled", false);

    var users = {
      'accountNumber': accountnumber,
      'accountPin': accountpin,
      'chequingBalance': 2000,
      'savingsBalance': 5000
    };
    updateSessionStorage(users);
  } else {
    $("input[id=submitAccountInfo]").prop("disabled", true);
  }
}

function init_money(users){
  setSavingsBalance(init_savings_balance);
  setChequingBalance(init_chequing_balance);
  setAccountNum(account_num);
}

function validPin(pin){
  return $.isNumeric(pin) == true && pin > 0 && pin.length == 4;
}

function validAccNum(num){
  return $.isNumeric(num) == true && num > 0 && num.length == 16;
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

function thankyouAlert(){
  $("#transactionpage").hide();
  $("#completionAlert").show();
  setTimeout(closeAlert, 3000);
}

function closeAlert(){
  $("#completionAlert").fadeOut("slow");
  location.href = "index.html";
}

function getSessionStorage(){
  return JSON.parse(sessionStorage.getItem('User'));
}

function logout(){
  sessionStorage.clear();
}

function fastCash(amt, action){
  storage = getSessionStorage();
  if (getChequingBalance() < amt){
    $("#error-msg-dash").text("Sorry, you cannot use Fast cash as you have less than $60 in your chequing account");
    return false;
  } else {
    //update chequing
    old_amt = parseInt(getChequingBalance());
    new_amt = old_amt - parseInt(amt);
    setChequingBalance(new_amt);
    location.href = "anothertransaction.html";
  }
}

function receipt(){
  var account = JSON.parse(sessionStorage.getItem('User'));
  var account_num = account['accountNumber'];
  var chequing_balance = account['chequingBalance'];
  var saving_balance = account['savingsBalance'];

  $("#acc_num").text(account_num);
  $("#cheq_balance").text(chequing_balance);
  $("#saving_balance").text(saving_balance);
  var currentdate = new Date();
  var time = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
  $("#date").text(time);
}
