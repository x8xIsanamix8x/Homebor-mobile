<?php

require("connectapp.php");
require("cript.php");

$result = connect();
$response = array();

$json = file_get_contents('php://input');
$jsonObj = json_decode($json,true);

$hname = $jsonObj["hName"];
$num = $jsonObj["nUm"];
$room = $jsonObj["rOom"];

$sql = "INSERT INTO pe_home(h_name, num, room) VALUES (:hname,:num,:room) AND email = 'c@gmail.com'";
$query = $result->prepare($sql);
$res = $query->execute([
"hname" => $hname,
"num" => $num,
"room" => $room,
]);

if($res){
    $response["status"] = 1;
}else{
    $response["status"] = 0;
}

echo json_encode($response);

?>