<?php

require("connectapp.php");

$result = connect();
$response = array();

$id = $_GET["id"];
$email = $_GET["email"];
$id_m = $_GET["idm"];
$f_name1 = $_GET["f_name1"];
$f_lname1 = $_GET["f_lname1"];
$db1 = $_GET["db1"];
$gender1 = $_GET["gender1"];
$re1 = $_GET["re1"];
$db_lawf1 = $_GET["db_lawf1"];
$f_name2 = $_GET["f_name2"];
$f_lname2 = $_GET["f_lname2"];
$db2 = $_GET["db2"];
$gender2 = $_GET["gender2"];
$re2 = $_GET["re2"];
$db_lawf2 = $_GET["db_lawf2"];
$f_name3 = $_GET["f_name3"];
$f_lname3 = $_GET["f_lname3"];
$db3 = $_GET["db3"];
$gender3 = $_GET["gender3"];
$re3 = $_GET["re3"];
$db_lawf3 = $_GET["db_lawf3"];
$f_name4 = $_GET["f_name4"];
$f_lname4 = $_GET["f_lname4"];
$db4 = $_GET["db4"];
$gender4 = $_GET["gender4"];
$re4 = $_GET["re4"];
$db_lawf4 = $_GET["db_lawf4"];
$f_name5 = $_GET["f_name5"];
$f_lname5 = $_GET["f_lname5"];
$db5 = $_GET["db5"];
$gender5 = $_GET["gender5"];
$re5 = $_GET["re5"];
$db_lawf5 = $_GET["db_lawf5"];
$f_name6 = $_GET["f_name6"];
$f_lname6 = $_GET["f_lname6"];
$db6 = $_GET["db6"];
$gender6 = $_GET["gender6"];
$re6 = $_GET["re6"];
$db_lawf6 = $_GET["db_lawf6"];
$f_name7 = $_GET["f_name7"];
$f_lname7 = $_GET["f_lname7"];
$db7 = $_GET["db7"];
$gender7 = $_GET["gender7"];
$re7 = $_GET["re7"];
$db_lawf7 = $_GET["db_lawf7"];
$f_name8 = $_GET["f_name8"];
$f_lname8 = $_GET["f_lname8"];
$db8 = $_GET["db8"];
$gender8 = $_GET["gender8"];
$re8 = $_GET["re8"];
$db_lawf8 = $_GET["db_lawf8"];

date_default_timezone_set("America/Toronto");
$date = date('Y-m-d H:i:s');

$sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Edit Homestay Family Data', '$date', '$email', '$id_m');
        UPDATE mem_f SET f_name1='$f_name1', f_lname1='$f_lname1', db1='$db1', gender1='$gender1', re1='$re1', db_lawf1='$db_lawf1', f_name2='$f_name2', f_lname2='$f_lname2', db2='$db2', gender2='$gender2', re2='$re2', db_lawf2='$db_lawf2', f_name3='$f_name3', f_lname3='$f_lname3', db3='$db3', gender3='$gender3', re3='$re3', db_lawf3='$db_lawf3', f_name4='$f_name4', f_lname4='$f_lname4', db4='$db4', gender4='$gender4', re4='$re4', db_lawf4='$db_lawf4', f_name5='$f_name5', f_lname5='$f_lname5', db5='$db5', gender5='$gender5', re5='$re5', db_lawf5='$db_lawf5', f_name6='$f_name6', f_lname6='$f_lname6', db6='$db6', gender6='$gender6', re6='$re6', db_lawf6='$db_lawf6', f_name7='$f_name7', f_lname7='$f_lname7', db7='$db7', gender7='$gender7', re7='$re7', db_lawf7='$db_lawf7', f_name8='$f_name8', f_lname8='$f_lname8', db8='$db8', gender8='$gender8', re8='$re8', db_lawf8='$db_lawf8' WHERE id_home = '$id'";
$query = $result->prepare($sql);
$res = $query->execute();

if($res){
    $response["status"] = 1;
}else{
    $response["status"] = 0;
}


echo json_encode($response);

?>