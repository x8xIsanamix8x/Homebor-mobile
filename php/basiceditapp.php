<?php

require("connectapp.php");

$result = connect();
$response = array();

$id = $_GET["id"];
$email = $_GET["email"];
$hname = $_GET["hname"];
$num = $_GET["num"];
$dir = $_GET["dir"];
$city = $_GET["cities"];
$state = $_GET["states"];
$p_code = $_GET["p_code"];
$id_m = $_GET["idm"];
$name_h = $_GET["nameh"];
$l_name_h = $_GET["lnameh"];
$db = $_GET["db"];
$gender = $_GET["gender"];
$db_law = $_GET["dblaw"];

$img_path='./public/'.$email.'/'.$_FILES['backfile']['name'];
$img_path2='public/'.$email.'/'.$_FILES['backfile']['name']; 


date_default_timezone_set("America/Toronto");
$date = date('Y-m-d H:i:s');

if(isset($_FILES['backfile']['name'])){
    if(move_uploaded_file($_FILES['backfile']['tmp_name'],$img_path)){
        $sql="INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Edit Homestay Data', '$date', '$email', '$id_m');
        UPDATE pe_home, propertie_control SET pe_home.h_name='$hname', pe_home.num='$num', pe_home.dir='$dir', pe_home.city='$city', pe_home.state='$state', pe_home.p_code='$p_code', pe_home.name_h='$name_h', pe_home.l_name_h='$l_name_h', pe_home.db='$db', pe_home.gender='$gender', pe_home.db_law='$db_law', pe_home.law='$img_path2', propertie_control.h_name='$hname', propertie_control.dir='$dir', propertie_control.city='$city'  WHERE pe_home.mail_h = '$email' AND pe_home.id_home = '$id' AND propertie_control.id_home = '$id'";
        $img_pathComplete='http://homebor.com/public/'.$email.'/'.$_FILES['backfile']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    }
}

else {

$sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Edit Homestay Data', '$date', '$email', '$id_m');
        UPDATE pe_home, propertie_control SET pe_home.h_name='$hname', pe_home.num='$num', pe_home.dir='$dir', pe_home.city='$city', pe_home.state='$state', pe_home.p_code='$p_code', pe_home.name_h='$name_h', pe_home.l_name_h='$l_name_h', pe_home.db='$db', pe_home.gender='$gender', pe_home.db_law='$db_law', propertie_control.h_name='$hname', propertie_control.dir='$dir', propertie_control.city='$city'  WHERE pe_home.mail_h = '$email' AND pe_home.id_home = '$id' AND propertie_control.id_home = '$id'";
$query = $result->prepare($sql);
$res = $query->execute();

if($res){
    $response["status"] = 1;
}else{
    $response["status"] = 0;
}
}


echo json_encode($response);

?>