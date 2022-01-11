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

$user = $name.' '.$lastname;

date_default_timezone_set("America/Toronto");
$date = date('Y-m-d H:i:s');

$sql = "INSERT INTO users(mail, psw, name, l_name)
SELECT '$email', '$passwordE', '$name', '$lastname'
FROM dual
WHERE NOT EXISTS (SELECT * FROM users WHERE mail = '$email')LIMIT 1;
INSERT INTO pe_home (name_h, l_name_h, mail_h) VALUES ('$name', '$lastname', '$email');
INSERT INTO room (id_home) VALUES (Last_insert_id());
INSERT INTO photo_home (id_home) VALUES (Last_insert_id());
INSERT INTO mem_f (id_home) VALUES (Last_insert_id());
INSERT INTO vouche ( title, email, user, sender, id_m, dates, link) VALUES ('Welcome to Homebor', '$email', '$user', 'Homebor', '0', '$date', 'welcome.php')";
$query = $result->prepare($sql);
$res = $query->execute();

if($res){
    $response["status"] = 1;
}else{
    $response["status"] = 0;
}


echo json_encode($response);

?>