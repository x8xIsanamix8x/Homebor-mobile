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
$id_m = $_GET["idm"];
$a_pre = $_GET["a_pre"];
$allergies = $_GET["allergies"];
$medic_f = $_GET["medic_f"];
$health_f = $_GET["health_f"];
$religion = $_GET["religion"];
$condition_m = $_GET["condition_m"];
$misdemeanor = $_GET["misdemeanor"];
$c_background = $_GET["c_background"];
$allergies2 = $_GET["allergies2"];
$medic_f2 = $_GET["medic_f2"];
$health_f2 = $_GET["health_f2"];
$religion2 = $_GET["religion2"];
$condition_m2 = $_GET["condition_m2"];
$misdemeanor2 = $_GET["misdemeanor2"];


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
        UPDATE pe_home SET des = '$des', num_mem = '$num_mem', backg = '$backg', backl = '$backl', a_pre = '$a_pre', g_pre = '$g_pre2', ag_pre = '$ag_pre2', allergies = '$allergiesr', medic_f = '$medic_fr', health_f = '$health_fr', religion = '$religionr', condition_m = '$condition_mr', misdemeanor='$misdemeanorr', c_background = '$c_background' WHERE mail_h = '$email' AND id_home = '$id';
        UPDATE propertie_control SET g_pre = '$g_pre2',  ag_pre = '$ag_pre2' WHERE  id_home = '$id'";
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