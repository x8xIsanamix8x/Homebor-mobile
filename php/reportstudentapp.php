<?php

require("connectapp.php");

$result = connect();
$response = array();

$name_h = $_GET["name_h"];
$l_name_h = $_GET["l_name_h"];
$email = $_GET["email"];
$managermail = $_GET["managermail"];
$agency = $_GET["agency"];
$mail = $_GET["mail"];
$des = $_GET["des"];
$idnoti = $_GET["idnoti"];
$report = $_GET["report"];
$bedrooms = $_GET["bedrooms"];

$user = $name_h.' '.$l_name_h;

date_default_timezone_set("America/Toronto");
$date = date('Y-m-d H:i:s');

$sql = "INSERT INTO notification (user_i, user_i_l, user_i_mail, bedrooms, user_r, date_, state, confirmed, title, des, report_s, status) VALUES ('$name_h', '$l_name_h', '$email', '$bedrooms', '$managermail', '$date', '0', '0', '$report', '$des', '$mail', 'Active');
        INSERT INTO reports (names_i, mail_i, names_r, mail_r, stu_rep, des, date, status, id_not) VALUES ('$user', '$email', '$agency', '$managermail', '$mail', '$des', '$date', 'Active', Last_insert_id())";
$query = $result->prepare($sql);
$res = $query->execute();

if($res){
    $response["status"] = 1;
}else{
    $response["status"] = 0;
}


echo json_encode($response);

?>

