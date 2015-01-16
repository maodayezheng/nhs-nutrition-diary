
<?php
$first_name=$_POST['first_name'];
$last_name=$_POST['last_name'];
$email= $_POST['email'];
$message= $_POST['message'];


$subject="GST Patient Report";
$headers .= 'From: Patient at GST <PatientGST@gmail.com>' . "\r\n";


// Mail it
mail($email, $subject, $message, $headers);
echo "Your message has been sent bro";

?>

