<?php

require("connectapp.php");

$result = connect();
$response = array();

$id = $_GET["id"];
$email = $_GET["email"];
$des = $_GET["des"];
$num_mem = $_GET["num_mem"];
$backg = $_GET["backg"];
$backl = $_GET["backl"];
$g_pre = $_GET["g_pre"];
$ag_pre = $_GET["ag_pre"];
$status = $_GET["status"];
$cell = $_GET["cell"];
$smoke = $_GET["smoke"];
$pet = $_GET["pet"];
$pet_num = $_GET["pet_num"];
$type_pet = $_GET["type_pet"];
$id_m = $_GET["idm"];
$a_pre = $_GET["a_pre"];
$itemDog = $_GET["itemDog"];
$itemCat = $_GET["itemCat"];
$itemOther = $_GET["itemOther"];
$itemVegetarian = $_GET["itemVegetarian"];
$itemHalal = $_GET["itemHalal"];
$itemKosher = $_GET["itemKosher"];
$itemLactose = $_GET["itemLactose"];
$itemGluten = $_GET["itemGluten"];
$itemPork = $_GET["itemPork"];
$itemNone = $_GET["itemNone"];

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
    $none = 'no';
}else{
    $none = 'yes';
}



date_default_timezone_set("America/Toronto");
$date = date('Y-m-d H:i:s');

$sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Edit Homestay Additional Data', '$date', '$email', '$id_m');
        UPDATE pe_home SET des = '$des', num_mem = '$num_mem', backg = '$backg', backl = '$backl', a_pre = '$a_pre', g_pre = '$g_pre', ag_pre = '$ag_pre', status = '$status', cell = '$cell', smoke = '$smoke', vegetarians = '$vegetarian', halal = '$halal', kosher = '$kosher', lactose = '$lactose', gluten = '$gluten', pork = '$pork', none = '$none', pet = '$pet', pet_num = '$pet_num', type_pet = '$type_pet', dog = '$dog', cat = '$cat', other = '$other' WHERE mail_h = '$email' AND id_home = '$id'";
$query = $result->prepare($sql);
$res = $query->execute();

if($res){
    $response["status"] = 1;
}else{
    $response["status"] = 0;
}


echo json_encode($response);

?>