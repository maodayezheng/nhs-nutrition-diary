/**
 * 
 * Created 26th December 2014
 * @author Vikram Bakshi
 */

function Cookies() {} //cookies constructor

/**
 * This method returns the value of a given cookie with the defined @param name. If the cookie does not exist it returns null.
 * Original JavaScript code by Chirp Internet: www.chirp.com.au. Sourced from: http://www.the-art-of-web.com/javascript/getcookie/
 */
Cookies.prototype.getCookie = function(name)
{
	var re = new RegExp(name + "=([^;]+)");
	var value = re.exec(document.cookie);
	return (value != null) ? unescape(value[1]) : null;
}

/**
 * Method returns the value of the userID cookie. If it does not exist it returns null. 
 * @returns
 */
Cookies.prototype.getUserID = function() 
{
	return Cookies.prototype.getCookie("appetiteCookieUserID");
}


console.log(document.cookie);
console.log("Current User Logged in is:");
console.log(Cookies.prototype.getCookie("appetiteCookieUserID"));

if(!Cookies.prototype.getUserID()) 
{
	console.log("No User ID stored in cookie. The User is not logged in. Redirecting to notLoggedIn.html ....");
	
}
