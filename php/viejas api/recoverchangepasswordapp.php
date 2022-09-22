<?php

require("connectapp.php");
require("cript.php");

$result = connect();
$response = array();

$email = $_GET["email"];
$password = $_GET["password"];
$passwordE = SED::encryption($password);

date_default_timezone_set("America/Toronto");
$date = date('Y-m-d H:i:s');

$sql = "UPDATE users SET psw='$passwordE' WHERE mail='$email';
INSERT INTO webmaster (user, activity, dates, edit_user, id_m, report_s, reason) VALUES ('$email', 'Change Password', '$date', '$email', '0', 'NULL', 'Changed password from app mobile')
";
$query = $result->prepare($sql);
$res = $query->execute();

if($res){
    $response["status"] = 1;
}else{
    $response["status"] = 0;
}


echo json_encode($response);
mysqli_close($result);

?>