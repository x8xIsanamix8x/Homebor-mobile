<?php

require("connectapp.php");

$result = connect();
$response = array();

$email = $_GET["email"];
$mail = $_GET["mail"];
$idnoti = $_GET["idnoti"];
$h_name = $_GET["h_name"];
$name_h = $_GET["name_h"];
$l_name_h = $_GET["l_name_h"];
$start = $_GET["start"];
$name_s = $_GET["name_s"];
$l_name_s = $_GET["l_name_s"];
$bedrooms = $_GET["bedrooms"];
$end = $_GET["end"];
$idm = $_GET["idm"];

if ($bedrooms == "1") {
    $room_e = "room1";
    $color = "#232159";
}else{}

if ($bedrooms == "2") {
    $room_e = "room2";
    $color = "#982a72";
}else{}

if ($bedrooms == "3") {
    $room_e = "room3";
    $color = "#394893";
}else{}

if ($bedrooms == "4") {
    $room_e = "room4";
    $color = "#A54483";
}else{}

if ($bedrooms == "5") {
    $room_e = "room5";
    $color = "#5D418D";
}else{}

if ($bedrooms == "6") {
    $room_e = "room6";
    $color = "#392B84";
}else{}

if ($bedrooms == "7") {
    $room_e = "room7";
    $color = "#B15391";
}else{}

if ($bedrooms == "8") {
    $room_e = "room8";
    $color = "#4F177D";
}else{}

$studentname = $name_s.' '.$l_name_s;

date_default_timezone_set("America/Toronto");
$date = date('Y-m-d H:i:s');

$sql = "UPDATE notification SET state = '1', confirmed = '1' WHERE user_i_mail = '$mail' AND user_r = '$email' AND id_not = '$idnoti';
        INSERT INTO noti_student (h_name, user_i, user_i_l, user_i_mail, user_r, date_, state, confirmed, des) VALUES ('$h_name', '$name_h', '$l_name_h', '$email', '$mail', '$start', '1', '0', 'Student Confirmed');
        INSERT INTO events (title, color, room_e, start, startingDay, end, endingDay, email, mail_s, height, id_m) VALUES ('$studentname', '$color', '$room_e', '$start', 'true', '$end', 'true', '$email', '$mail', '80', '$idm');
        INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Confirmed Student', '$date', '$mail', '$idm');
        UPDATE pe_student SET status = 'Homestay Found' WHERE mail_s = '$mail'";
$query = $result->prepare($sql);
$res = $query->execute();

if($res){
    $response["status"] = 1;
}else{
    $response["status"] = 0;
}


echo json_encode($response);

?>

