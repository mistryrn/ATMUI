var init_savings_balance = getSavingsBalance();
var init_chequing_balance = getChequingBalance();
var account_num = getAccountNum();

$(document).ready(function() {
  $("#amountUpdate").focus();
  $("#vkb-btn-del").addClass("disabled");
  keyboardInput();
  var users = getSessionStorage();
  init_money(users);
});

// disable keyboard input
$(document).on('keydown',function(e) {
  e.preventDefault();
});

function keyboardInput() {
  $(document).on('click', '.vkb-btn', function(e) {
    e.preventDefault();
    var input = $("#transfer-amount");
    if (e.target.id !== "vkb-btn-del" && e.target.id !== "vkb-btn-enter") {
      input.val(input.val() + e.target.text);
    } else if (e.target.id === "vkb-btn-del") {
      input.val(input.val().slice(0,-1));
      if (input.val().length === 0)
        $("#vkb-btn-del").addClass("disabled");
    } else if (e.target.id === "vkb-btn-enter") {
        transferMoney();
    }
    if (input.val().length > 0) {
      $("#vkb-btn-del").removeClass("disabled");
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

function transferMoney(){
  var storage = getSessionStorage();
  var from_acc = $("#from_acc").find(":selected").text();
  var to_acc = $("#to_acc").find(":selected").text();
  var amount_to_transfer = parseInt($("#transfer-amount").val());
  if (from_acc == to_acc){
    $("#transfer-money").text("Sorry, you cannot transfer money from and to the same account");
    return false;
  }

  if (from_acc == "Chequing" && to_acc == "Savings"){
    if (amount_to_transfer > getChequingBalance()){
      $("#transfer-money").text("Sorry, you cannot transfer more money than you have in your chequing account!");
      return false;
    }
    depositMoneyUpdate(amount_to_transfer, "savings", storage);
    withdrawMoneyUpdate(amount_to_transfer, "chequing", storage);
  } else {
    if (amount_to_transfer > getSavingsBalance()){
      $("#transfer-money").text("Sorry, you cannot transfer more money than you have in your saving account!");
      return false;
    }
    depositMoneyUpdate(amount_to_transfer, "chequing", storage);
    withdrawMoneyUpdate(amount_to_transfer, "savings", storage);
  }
  location.href = 'dash.html';
}

function depositMoneyUpdate(amt, action, storage){
  if (action == "chequing"){
    //update chequing
    old_amt = parseInt(getChequingBalance());
    new_amt = old_amt + parseInt(amt);
    setChequingBalance(new_amt);
  } else {
    //update savings
    old_amt = parseInt(getSavingsBalance());
    new_amt = old_amt + parseInt(amt);
    setSavingsBalance(new_amt);
  }
}

function withdrawMoneyUpdate(amt, action, storage){
  if (action == "chequing"){
    //update chequing
    old_amt = parseInt(getChequingBalance());
    new_amt = old_amt - parseInt(amt);
    setChequingBalance(new_amt);
  } else {
    //update savings
    old_amt = parseInt(getSavingsBalance());
    new_amt = old_amt - parseInt(amt);
    setSavingsBalance(new_amt);
  }
}
