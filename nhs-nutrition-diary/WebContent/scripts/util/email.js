$(document).ready(function() {
	$('.email').click(function() {
		console.log("email");
		window.location = 'mailto:' + $(this).data('email') + '?subject=Updated Patient Report&body=eMail sent by Appetite';
	});
});