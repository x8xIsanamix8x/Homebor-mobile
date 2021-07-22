<?php

require("connectapp.php");
require("cript.php");

$result = connect();
$response = array();

$name = $_GET["name"];
$lastname = $_GET["lastname"];
$email = $_GET["email"];
$password = $_GET["password"];
$passwordE = SED::encryption($password);

$sql = "INSERT INTO users(mail, psw, name, l_name)
SELECT '$email', '$passwordE', '$name', '$lastname'
FROM dual
WHERE NOT EXISTS (SELECT * FROM users WHERE mail = '$email')LIMIT 1";
$query = $result->prepare($sql);
$res = $query->execute();

if($res){
    $response["status"] = 1;
}else{
    $response["status"] = 0;
}


echo json_encode($response);

?>