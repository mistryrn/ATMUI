$(document).ready(function() {
  validateAccount();
  $("#accnum").keyup(validateAccount);
  $("#numpin").keyup(validateAccount);
  getAccountInfo();
});

function validateAccount(){
  var accountnumber = $("#accnum").val();
  var accountpin = $("#numpin").val();
	//constraining the length of the account number to be 16 characters long, numeric and greater than 0
	if($.isNumeric(accountnumber) == true && accountnumber > 0 && accountnumber.length == 16 && $.isNumeric(accountpin) == true && accountpin > 0 && accountpin.length == 4){
		$("input[type=button]").prop("disabled", false);
		var users = {
			'accountNumber': accountnumber,
			'accountPin': accountpin,
      'balance': 0
    };
    sessionStorage.setItem("User", JSON.stringify(users));
    console.log(users);
  }else{
    $("input[type=button]").prop("disabled", true);
  }
}

function getAccountInfo(){
  var users = JSON.parse(sessionStorage.getItem('User'));
  console.log(users['accountNumber']);
  $("#accountnum").text(users['accountNumber']);
  users['balance'] = 2000.00;
  $("#accountbalance").text("$"+users['balance']);
  sessionStorage.setItem("User", JSON.stringify(users));
  console.log(users);
}