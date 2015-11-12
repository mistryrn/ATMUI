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
    var input = $("#amountUpdate");
    if (e.target.id !== "vkb-btn-del" && e.target.id !== "vkb-btn-enter") {
      input.val(input.val() + e.target.text);
    } else if (e.target.id === "vkb-btn-del") {
      input.val(input.val().slice(0,-1));
      if (input.val().length === 0)
        $("#vkb-btn-del").addClass("disabled");
    } else if (e.target.id === "vkb-btn-enter") {
        updateMoney();
        location.href = 'anothertransaction.html';
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

function accountUpdate(el){
  ids = $(el).attr('id').split('-');
  var storage = getSessionStorage();
  storage['accountAction'] = ids[0];
  storage['accountType'] = ids[1];
  updateSessionStorage(storage);
}

function setText(){
  var storage = getSessionStorage();
  if (storage['accountAction'] == "chequing" && storage['accountType'] == "deposit"){
    $("#accountinfo").text("Chequing Deposit");
  } else if(storage['accountAction'] == "savings" && storage['accountType'] == "deposit"){
    $("#accountinfo").text("Savings Deposit");
  } else if(storage['accountAction'] == "chequing" && storage['accountType'] == "withdraw"){
    $("#accountinfo").text("Chequing Withdraw");
  } else{
    $("#accountinfo").text("Savings Withdraw");
  }
}

function updateMoney(){
  var storage = getSessionStorage();
  var amount = $("#amountUpdate").val();
  var transactionType = storage['accountType'];
  var action = storage['accountAction']
  if (transactionType == "deposit"){
    //deposit
    depositMoneyUpdate(amount, action, storage);
  } else {
    //withdraw
    withdrawMoneyUpdate(amount, action, storage);
  }
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
  location.href = 'anothertransaction.html';
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
  location.href = 'anothertransaction.html';
}

function presetAmount(amount){
  $("#amountUpdate").val(amount);
  updateMoney();
}
