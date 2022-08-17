<?php

require("connectapp.php");
require("cript.php");

$result = connect();
$response = array();

$name = addslashes($_GET["name"]);
$lastname = addslashes($_GET["lastname"]);
$email = $_GET["email"];
$password = $_GET["password"];
$passwordE = SED::encryption($password);
$id_m = $_GET["id_m"];

if ($id_m == '10'){
    $title = 'Welcome to iHomestay';
    $sender = 'iHomestay';
    $link = 'welcomea.php';
}else{
    $title = 'Welcome to Homebor';
    $sender = 'Homebor';
    $link = 'welcome.php';
}

$user = $name.' '.$lastname;

date_default_timezone_set("America/Toronto");
$date = date('Y-m-d H:i:s');

if ($id_m == '10'){
$sql = "INSERT INTO users(mail, psw, name, l_name)
SELECT '$email', '$passwordE', '$name', '$lastname'
FROM dual
WHERE NOT EXISTS (SELECT * FROM users WHERE mail = '$email')LIMIT 1;
INSERT INTO pe_home (name_h, l_name_h, mail_h, id_m) VALUES ('$name', '$lastname', '$email', '$id_m');
INSERT INTO room (id_home) VALUES (Last_insert_id());
INSERT INTO photo_home (id_home) VALUES (Last_insert_id());
INSERT INTO mem_f (id_home) VALUES (Last_insert_id());
INSERT INTO propertie_control (id_home, id_m, agency, id_ag, db, h_name) VALUES (Last_insert_id(), '$id_m', '$id_m', '0', '$date', '$user');
INSERT INTO vouche ( title, email, user, sender, id_m, dates, link) VALUES ('$title', '$email', '$user', '$sender', '$id_m', '$date', '$link')";
$query = $result->prepare($sql);
$res = $query->execute();
} else {

    $sql = "INSERT INTO users(mail, psw, name, l_name)
    SELECT '$email', '$passwordE', '$name', '$lastname'
    FROM dual
    WHERE NOT EXISTS (SELECT * FROM users WHERE mail = '$email')LIMIT 1;
    INSERT INTO pe_home (name_h, l_name_h, mail_h, id_m) VALUES ('$name', '$lastname', '$email', '$id_m');
    INSERT INTO room (id_home) VALUES (Last_insert_id());
    INSERT INTO photo_home (id_home) VALUES (Last_insert_id());
    INSERT INTO mem_f (id_home) VALUES (Last_insert_id());
    INSERT INTO vouche ( title, email, user, sender, id_m, dates, link) VALUES ('$title', '$email', '$user', '$sender', '$id_m', '$date', '$link')";
    $query = $result->prepare($sql);
    $res = $query->execute();
}

if($res){
    $response["status"] = 1;
}else{
    $response["status"] = 0;
}


echo json_encode($response);
mysqli_close($result);
?>