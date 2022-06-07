<?php

require("connectapp.php");
require("cript.php");

$result = connect();
$response = array();

$json = file_get_contents('php://input');
$jsonObj = json_decode($json,true);

$hname = $jsonObj["hName"];
$num = $jsonObj["nUm"];

$sql = "UPDATE pe_home SET h_name='$hname', num='$num' WHERE mail_h='c@gmail.com'";
$query = $result->prepare($sql);
$res = $query->execute([
"hname" => $hname,
"num" => $num,
]);

if($res){
    $response["status"] = 1;
}else{
    $response["status"] = 0;
}

echo json_encode($response);
mysqli_close($result);
?>