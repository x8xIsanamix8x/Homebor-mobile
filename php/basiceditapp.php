<?php

require("connectapp.php");

$result = connect();
$response = array();

$id = $_GET["id"];
$email = $_GET["email"];
$hname = addslashes($_GET["hname"]);
$num = $_GET["num"];
$h_type = $_GET["h_type"];
$m_city = $_GET["m_city"];
$dir = addslashes($_GET["dir"]);
$city = addslashes($_GET["cities"]);
$state = addslashes($_GET["states"]);
$p_code = addslashes($_GET["p_code"]);
$smoke = $_GET["smoke2"];
$y_service = $_GET["y_service"];
$m_service = $_GET["m_service"];
$itemVegetarian = $_GET["itemVegetarian"];
$itemHalal = $_GET["itemHalal"];
$itemKosher = $_GET["itemKosher"];
$itemLactose = $_GET["itemLactose"];
$itemGluten = $_GET["itemGluten"];
$itemPork = $_GET["itemPork"];
$itemNone = $_GET["itemNone"]; 
$pet = $_GET["pet"];
$pet_num = $_GET["pet_num"];
$itemDog = $_GET["itemDog"];
$itemCat = $_GET["itemCat"];
$itemOther = $_GET["itemOther"];
$type_pet = addslashes($_GET["type_pet"]);
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
if ($itemVegetarian != 'true') {
    $vegetarian = 'no';
}else{
    $vegetarian = 'yes';
}
if ($itemHalal != 'true') {
    $halal = 'no';
}else{
    $halal = 'yes';
}
if ($itemKosher != 'true') {
    $kosher = 'no';
}else{
    $kosher = 'yes';
}
if ($itemLactose != 'true') {
    $lactose = 'no';
}else{
    $lactose = 'yes';
}
if ($itemGluten != 'true') {
    $gluten = 'no';
}else{
    $gluten = 'yes';
}
if ($itemPork != 'true') {
    $pork = 'no';
}else{
    $pork = 'yes';
}
if ($itemNone != 'true') {
    if ($m_service == "No") {
        $none = 'yes';
    } else {
        $none = 'no';
    }
}else{
    $none = 'yes';
}



date_default_timezone_set("America/Toronto");
$date = date('Y-m-d H:i:s');


$sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Edit Homestay Data', '$date', '$email', '$id_m');
UPDATE pe_home SET h_name='$hname', num='$num', m_city='$m_city', dir='$dir', city='$city', state='$state', p_code='$p_code', smoke='$smoke', vegetarians='$vegetarian', halal='$halal', kosher='$kosher', lactose='$lactose', gluten='$gluten', pork='$pork', none='$none', pet='$pet', pet_num='$pet_num', type_pet='$type_pet', dog='$dog', cat='$cat', other='$other', m_service='$m_service', y_service='$y_service', h_type='$h_type' WHERE mail_h = '$email' AND id_home = '$id';
UPDATE propertie_control SET h_name='$hname', dir='$dir', city='$city', pet='$pet', smoke='$smoke', vegetarians='$vegetarian', halal='$halal', kosher='$kosher', lactose='$lactose', gluten='$gluten', pork='$pork', none='$none' WHERE id_home = '$id'";
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