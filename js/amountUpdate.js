$(document).ready(function() {
  $("#amountUpdate").focus();
  $("#vkb-btn-del").addClass("disabled");
  keyboardInput();
  var users = getSessionStorage();
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

function getSessionStorage(){
  return JSON.parse(sessionStorage.getItem('User'));
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
  if (storage['accountAction'] == "chequing"){
    $("#accountinfo").text("Chequing Deposit");
  } else {
    $("#accountinfo").text("Savings Deposit");
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
