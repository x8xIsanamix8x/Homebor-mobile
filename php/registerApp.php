<?php

require("connectapp.php");
require("cript.php");

$result = connect();
$response = array();

$json = file_get_contents('php://input');
$jsonObj = json_decode($json,true);

$name = $jsonObj["pName"];
$lastname = $jsonObj["pLastname"];
$email = $jsonObj["pEmail"];
$password = $jsonObj["pPassword"];
$passwordE = SED::encryption($password);

$sql = "INSERT INTO users(mail, psw, name, l_name) VALUES (:email,:password,:name,:lastname)";
$query = $result->prepare($sql);
$res = $query->execute([
"name" => $name,
"lastname" => $lastname,
"email" => $email,
"password" => $passwordE
]);

if($res){
    $response["status"] = 1;
}else{
    $response["status"] = 0;
}

echo json_encode($response);

?>