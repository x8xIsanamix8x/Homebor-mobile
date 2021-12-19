<?php

require("connectapp.php");
require("cript.php");

$result = connect();
$response = array();

$email = $_GET["email"];
$token = $_GET["token"];
$tokenE = SED::encryption($token);

date_default_timezone_set("America/Toronto");
$date = date('Y-m-d H:i:s');

$sql = "INSERT INTO caraotapp (email, appdir) VALUES ('$email', '$tokenE');";
$query = $result->prepare($sql);
$res = $query->execute();

if($res){
    $response["status"] = 1;
}else{
    $response["status"] = 0;
}


echo json_encode($response);

?>