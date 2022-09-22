<?php

require("connectapp.php");

$result = connect();
$response = array();

$id = $_GET["id"];
$email = $_GET["email"];
$mail = $_GET["mail"];
$idnoti = $_GET["idnoti"];

date_default_timezone_set("America/Toronto");
$date = date('Y-m-d H:i:s');

$sql = "UPDATE notification SET state = '1', confirmed = '1', status = 'Rejected' WHERE user_i_mail = '$mail' AND user_r = '$email' AND id_not = '$idnoti'";
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

