<?php

require("connectapp.php");

$result = connect();
$response = array();

$id = $_GET["id"];
$email = $_GET["email"];
$hname = $_GET["hname"];
$num = $_GET["num"];
$room = $_GET["room"];
$m_city = $_GET["m_city"];
$pet = $_GET["pet"];
$pet_num = $_GET["pet_num"];
$itemDog = $_GET["itemDog"];
$itemCat = $_GET["itemCat"];
$itemOther = $_GET["itemOther"];
$type_pet = $_GET["type_pet"];
$ag_pre = $_GET["ag_pre"];
$g_pre = $_GET["g_pre"];
$id_m = $_GET["idm"];

if ($itemDog != 'true') {
    $dog = 'no';
}else{
    $dog = 'yes';
}
if ($itemCat != 'true') {
    $cat = 'no';
}else{
    $cat = 'yes';
}
if ($itemOther != 'true') {
    $other = 'no';
}else{
    $other = 'yes';
}



date_default_timezone_set("America/Toronto");
$date = date('Y-m-d H:i:s');


$sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Register Required Fields From App', '$date', '$email', '$id_m');
        UPDATE pe_home SET h_name='$hname',num='$num',room='$room',m_city='$m_city', g_pre='$g_pre', ag_pre='$ag_pre',pet='$pet',pet_num='$pet_num',type_pet='$type_pet',dog='$dog',cat='$cat',other='$other' WHERE mail_h = '$email' AND id_home = '$id';
        UPDATE propertie_control SET h_name='$hname',room='$room',g_pre='$g_pre', ag_pre='$ag_pre',pet='$pet' WHERE id_home = '$id';";
$query = $result->prepare($sql);
$res = $query->execute();

    if($res){
        $response["status"] = 1;
    }else{
        $response["status"] = 0;
    }



echo json_encode($response);
mysqli_close($result);
?>