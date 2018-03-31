function validateUser(a1,a2) {
	$("#error").hide();
	var un = $("#name").val();
	var pw = $("#password").val();

	if (validateUserHelper(un, pw)) {

//    	window.location.replace("http://stackoverflow.com");
    	window.location.href = "dealer.html";
    	return false;
	} else {
    	console.log("wrong password");
    	$("#error").show();
    	return false;
	}
};

function validateUserHelper(un, pw) {
	if (un == 'dealer1' && pw == 'dealer1') {
    	return true;
	} else if (un == 'lender2' && pw == 'lender2') {
    	return true;
	} else if (un == 'investor3' && pw == 'investor3') {
    	return true;
	}
	return false;
}
//console.log(345);
