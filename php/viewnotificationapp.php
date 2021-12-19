<?php

require("connectapp.php");

$result = connect();
$response = array();

$userLogin = $_GET["idnoti"];

$sql = "UPDATE notification SET state='1', confirmed='1' WHERE id_not = '$userLogin'";
$query = $result->prepare($sql);
$res = $query->execute();

if($res){
    $response["status"] = 1;
}else{
    $response["status"] = 0;
}



echo json_encode($response);

?>