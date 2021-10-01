<?php

require("connectapp.php");

$result = connect();
$response = array();

$id = $_GET["idnoti"];
$email = $_GET["email"];
$des = $_GET["des"];
$name_h = $_GET["name_h"];
$l_name_h = $_GET["l_name_h"];
$a_name = $_GET["a_name"];
$a_mail = $_GET["a_mail"];
$stu_rep = $_GET["stu_rep"];
$status = $_GET["status"];

date_default_timezone_set("America/Toronto");
$date = date('Y-m-d H:i:s');

$names_i = $name_h.' '.$l_name_h;

    $sql = "INSERT INTO reports (names_i, mail_i, names_r, mail_r, stu_rep, des, date, status, id_not) VALUES ('$names_i', '$email', '$a_name', '$a_mail', '$stu_rep', '$des', '$date', '$status', '$id')";
    $query = $result->prepare($sql);
    $res = $query->execute();
    
    if($res){
        $response["status"] = 1;
    }else{
        $response["status"] = 0;
    }
        
        


echo json_encode($response);

?>

