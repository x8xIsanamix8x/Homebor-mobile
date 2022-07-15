<?php

require("connectapp.php");

$result = connect();
$response = array();

$id = $_GET["id"];
$email = $_GET["email"];
$des = $_GET["des"];
$a_pre = $_GET["a_pre"];
$backg = $_GET["backg"];
$religion2 = $_GET["religion2"];
$religion = $_GET["religion"];
$misdemeanor2 = $_GET["misdemeanor2"];
$misdemeanor = $_GET["misdemeanor"];
$c_background = $_GET["c_background"];
$smoke = $_GET["smoke2"];
$allergies = $_GET["allergies"];
$allergies2 = $_GET["allergies2"];
$medic_f2 = $_GET["medic_f2"];
$medic_f = $_GET["medic_f"];
$condition_m2 = $_GET["condition_m2"];
$condition_m = $_GET["condition_m"];
$health_f2 = $_GET["health_f2"];
$health_f = $_GET["health_f"];
$id_m = $_GET["idm"];


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

$sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Register Additional Information From App', '$date', '$email', '$id_m');
        UPDATE pe_home SET des='$des', backg='$backg', a_pre='$a_pre', smoke = '$smoke2', allergies = '$allergiesr', medic_f = '$medic_fr', health_f = '$health_fr', religion = '$religionr', condition_m = '$condition_mr', misdemeanor='$misdemeanorr', c_background = '$c_background' WHERE mail_h = '$email' AND id_home = '$id';
        UPDATE propertie_control SET status = '$status2',  smoke = '$smoke2' WHERE  id_home = '$id'";
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