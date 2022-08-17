<?php

require("connectapp.php");

$result = connect();
$response = array();

$userLogin = $_GET["email"];

$hname = $jsonObj["hName"];
$num = $jsonObj["nUm"];
$room = $jsonObj["rOom"];

$sql = $result->query("SELECT * FROM pe_home WHERE mail_h = '$userLogin'");
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
mysqli_close($result);
?>