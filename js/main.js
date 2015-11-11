var init_savings_balance = getSavingsBalance();
var init_chequing_balance = getChequingBalance();
var account_num = getAccountNum();

$(document).ready(function() {
  validateAccount();
  $("#accnum").keyup(validateAccount);
  $("#numpin").keyup(validateAccount);
  var users = JSON.parse(sessionStorage.getItem('User'));
  init_money(users);
});

function validateAccount(){
  var accountnumber = $("#accnum").val();
  var accountpin = $("#numpin").val();
	//constraining the length of the account number to be 16 characters long, numeric and greater than 0
	if(validAccNum(accountnumber) && validPin(accountpin)){
		$("input[type=button]").prop("disabled", false);

		var users = {
			'accountNumber': accountnumber,
			'accountPin': accountpin,
      'chequingBalance': 2000,
      'savingsBalance': 5000
    };
    updateSessionStorage(users);
  } else {
    $("input[type=button]").prop("disabled", true);
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
  var users = JSON.parse(sessionStorage.getItem('User'));
  return users['savingsBalance'];
}

function getChequingBalance(){
  var users = JSON.parse(sessionStorage.getItem('User'));
  return users['chequingBalance'];
}

function getAccountNum(){
  var users = JSON.parse(sessionStorage.getItem('User'));
  return users['accountNumber'];
}

function setAccountNum(num){
  var users = JSON.parse(sessionStorage.getItem('User'));
  users['accountNumber'] = num;
  updateSessionStorage(users);
  $("#accountnum").text(users['accountNumber']);
}

function setSavingsBalance(amt){
  var users = JSON.parse(sessionStorage.getItem('User'));
  users['savingsBalance'] = amt;
  updateSessionStorage(users);
  $("#savingsBalance").text("$" + users['savingsBalance']);
}

function setChequingBalance(amt){
  var users = JSON.parse(sessionStorage.getItem('User'));
  users['chequingBalance'] = amt;
  updateSessionStorage(users);
  $("#chequingBalance").text("$" + users['chequingBalance']);
}

function updateSessionStorage(user){
  sessionStorage.setItem("User", JSON.stringify(user));
}
