<?php

require("connectapp.php");

$result = connect();
$response = array();

$id = $_GET["id"];
$mail_h = $_GET["mail_h"];
$id_m = $_GET["id_m"];
$reason = $_GET["reason"];

date_default_timezone_set("America/Toronto");
$date = date('Y-m-d H:i:s');

$sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m, reason) VALUES ('$mail_h', 'Disable a Propertie', '$date', '$mail_h', '$id_m', '$reason');
UPDATE users, pe_home, propertie_control SET users.status = 'Disable', pe_home.status = 'Disable', propertie_control.status = 'Disable' WHERE users.mail = '$mail_h' AND pe_home.id_home = '$id' AND pe_home.id_home = propertie_control.id_home;";
$query = $result->prepare($sql);
$res = $query->execute();

if($res){
    $response["status"] = 1;
}else{
    $response["status"] = 0;
}


echo json_encode($response);

?>