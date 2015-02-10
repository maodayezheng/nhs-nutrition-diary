/**
 * 
 */


$(document).ready(function()
{
	$( "#progressbar" ).progressbar({
	      value: false
	 });
		
	//Dynamically loading the users in the directory div after the page is loaded. 
	
	var userRequest = {
			"action": "getUsers",
			"table": "users" 
	};
	
	var userResult = ServerDBAdapter.prototype.get(userRequest);
	var numOfUsers = userResult.length;
	//Add to the top of the division - there are 'X' registered users. 
	
	for(var i = 0, j = userResult.length; i < j; i++)
	{
		var nhsnumber 		= userResult[i]['nhsnumber'];
		var dob				= userResult[i]['dateofbirth'];
		var gender			= userResult[i]['gender'];
		var activityLevel	= userResult[i]['activitylevel'];
		
		$('#patientTable').append(
				'<tr>'
				+
					'<td name ="nhsnumber">' + nhsnumber +'</td>'
					+ '<td name ="DOB">' + dob + '</td>'
					+ '<td name="Gender">' + gender + '</td>'
					+ '<td name="Activitylevel">' + activityLevel + '</td>'
					
					+ '</tr>'
		);
	
	}
	
	$('#patientTable').append('</table>');
	
	//When clicking search button on dietitian view:
	$('#directory_search_button').on('click',(function (e)
	{
		alert("Clcicke search");	
		//Code for searching and displaying results in division. 
	}));	
});
