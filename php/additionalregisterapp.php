<?php

require("connectapp.php");

$result = connect();
$response = array();

$id = $_GET["id"];
$email = $_GET["email"];
$des = addslashes($_GET["des"]);
$num_mem = $_GET["num_mem"];
$backg = addslashes($_GET["backg"]);
$backl = addslashes($_GET["backl"]);
$g_pre = $_GET["g_pre"];
$ag_pre = $_GET["ag_pre"];
$status = $_GET["status"];
$smoke = $_GET["smoke2"];
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
$m_service = $_GET["m_service"];
$y_service = $_GET["y_service"];
$allergies = $_GET["allergies"];
$medic_f = $_GET["medic_f"];
$health_f = $_GET["health_f"];
$religion = $_GET["religion"];
$condition_m = $_GET["condition_m"];
$misdemeanor = $_GET["misdemeanor"];
$c_background = $_GET["c_background"];
$allergies2 = addslashes($_GET["allergies2"]);
$medic_f2 = addslashes($_GET["medic_f2"]);
$health_f2 = addslashes($_GET["health_f2"]);
$religion2 = addslashes($_GET["religion2"]);
$condition_m2 = addslashes($_GET["condition_m2"]);
$misdemeanor2 = addslashes($_GET["misdemeanor2"]);


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
if($allergies2 == 'Yes'){
    $allergiesr = $allergies;
}else{
    if ($allergies2 == 'No'){
        $allergiesr = 'No';
    }else{
        $allergiesr = 'NULL';
    }
}
if($medic_f2 == 'Yes'){
    $medic_fr = $medic_f;
}else{
    if ($medic_f2 == 'No'){
        $medic_fr = 'No';
    }else{
        $medic_fr = 'NULL';
    }
}
if($health_f2 == 'Yes'){
    $health_fr = $health_f;
}else{
    if ($medic_f2 == 'No'){
        $health_fr = 'No';
    }else{
        $health_fr = 'NULL';
    }
}
if($religion2 == 'Yes'){
    $religionr = $religion;
}else{
    if ($religion2 == 'No'){
        $religionr = 'No';
    }else{
        $religionr = 'NULL';
    }
}
if($condition_m2 == 'Yes'){
    $condition_mr = $condition_m;
}else{
    if ($condition_m2 == 'No'){
        $condition_mr = 'No';
    }else{
        $condition_mr = 'NULL';
    }
}
if($misdemeanor2 == 'Yes'){
    $misdemeanorr = $misdemeanor;
}else{
    if ($misdemeanor2 == 'No'){
        $misdemeanorr = 'No';
    }else{
        $misdemeanorr = 'NULL';
    }
}
if($pet == 'NULL'){
    $pet2 = 'No';
} else {
    $pet2 = $pet;
}
if ($status == 'NULL'){
    $status2 = 'Avalible';
} else {
    $status2 = $status;
}

if ($smoke == 'NULL') {
    $smoke2 = 'Strincly Non-Smooking';
} else {
    $smoke2 = $smoke;
}

if ($g_pre == 'NULL') {
    $g_pre2 = 'Any';
} else {
    $g_pre2 = $g_pre;
}

if ($ag_pre == 'NULL') {
    $ag_pre2 = 'Any'; 
} else {
    $ag_pre2 = $ag_pre;
}



date_default_timezone_set("America/Toronto");
$date = date('Y-m-d H:i:s');

$sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Edit Homestay Additional Data', '$date', '$email', '$id_m');
        UPDATE pe_home SET des = '$des', num_mem = '$num_mem', backg = '$backg', backl = '$backl', a_pre = '$a_pre', g_pre = '$g_pre2', ag_pre = '$ag_pre2', status = '$status2', smoke = '$smoke2', vegetarians = '$vegetarian', halal = '$halal', kosher = '$kosher', lactose = '$lactose', gluten = '$gluten', pork = '$pork', none = '$none', pet = '$pet2', pet_num = '$pet_num', type_pet = '$type_pet', dog = '$dog', cat = '$cat', other = '$other', m_service = '$m_service', y_service = '$y_service', allergies = '$allergiesr', medic_f = '$medic_fr', health_f = '$health_fr', religion = '$religionr', condition_m = '$condition_mr', misdemeanor='$misdemeanorr', c_background = '$c_background' WHERE mail_h = '$email' AND id_home = '$id';
        UPDATE propertie_control SET g_pre = '$g_pre2',  ag_pre = '$ag_pre2',  pet = '$pet2',  status = '$status2',  smoke = '$smoke2',  vegetarians = '$vegetarian',  halal = '$halal',  kosher = '$kosher',  lactose = '$lactose',  gluten = '$gluten',  pork = '$pork',  none = '$none' WHERE  id_home = '$id'";
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