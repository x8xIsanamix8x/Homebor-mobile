<?php

require("connectapp.php");

$result = connect();
$response = array();

$id = $_GET["id"];
$email = $_GET["email"];
$dir = $_GET["dir"];
$city = $_GET["cities"];
$state = $_GET["states"];
$p_code = $_GET["p_code"];
$h_type = $_GET["h_type"];
$y_service = $_GET["y_service"];
$m_service = $_GET["m_service"];
$num_mem = $_GET["num_mem"];
$backl = $_GET["backl"];
$itemVegetarian = $_GET["itemVegetarian"];
$itemHalal = $_GET["itemHalal"];
$itemKosher = $_GET["itemKosher"];
$itemLactose = $_GET["itemLactose"];
$itemGluten = $_GET["itemGluten"];
$itemPork = $_GET["itemPork"];
$itemNone = $_GET["itemNone"]; 
$id_m = $_GET["idm"];

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


$sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Register House Information From App', '$date', '$email', '$id_m');
        UPDATE pe_home SET dir='$dir', city='$city', state='$state', p_code='$p_code', num_mem='$num_mem', backl='$backl', vegetarians='$vegetarian', halal='$halal', kosher='$kosher', lactose='$lactose',gluten='$gluten',pork='$pork',none='$none',m_service='$m_service',y_service='$y_service',h_type='$h_type' WHERE mail_h = '$email' AND id_home = '$id';
        UPDATE propertie_control SET dir='$dir',city='$city',vegetarians='$vegetarian', halal='$halal', kosher='$kosher', lactose='$lactose',gluten='$gluten',pork='$pork',none='$none' WHERE id_home = '$id';";
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