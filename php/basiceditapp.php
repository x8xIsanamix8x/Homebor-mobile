<?php

require("connectapp.php");

$result = connect();
$response = array();

$id = $_GET["id"];
$email = $_GET["email"];
$hname = $_GET["hname"];
$num = $_GET["num"];
$h_type = $_GET["h_type"];
$m_city = $_GET["m_city"];
$dir = $_GET["dir"];
$city = $_GET["cities"];
$state = $_GET["states"];
$p_code = $_GET["p_code"];
$id_m = $_GET["idm"];
$name_h = $_GET["nameh"];
$l_name_h = $_GET["lnameh"];
$db = $_GET["db"];
$gender = $_GET["gender"];
$cell = $_GET["cell"];
$occupation_m2 = $_GET["occupation_m2"];
$db_law = $_GET["dblaw"];

$img_path='./public/'.$email.'/'.$_FILES['backfile']['name'];
$img_path2='public/'.$email.'/'.$_FILES['backfile']['name']; 


date_default_timezone_set("America/Toronto");
$date = date('Y-m-d H:i:s');

$path='./public/'.$email.'/';
    
    if (file_exists($path)) {
    }else { mkdir('./public/'.$email.'/', 0755);}

if(isset($_FILES['backfile']['name'])){
    
    if(move_uploaded_file($_FILES['backfile']['tmp_name'],$img_path)){
        $sql="INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Edit Homestay Data', '$date', '$email', '$id_m');
        UPDATE pe_home SET h_name='$hname', num='$num', m_city='$m_city', dir='$dir', city='$city', state='$state', p_code='$p_code', name_h='$name_h', l_name_h='$l_name_h', cell='$cell', db='$db', gender='$gender', db_law='$db_law', h_type = '$h_type', occupation_m='$occupation_m2', law='$img_path2'  WHERE mail_h = '$email' AND id_home = '$id';
        UPDATE propertie_control SET  h_name='$hname',  dir='$dir',  city='$city'  WHERE id_home = '$id'";
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
UPDATE pe_home SET h_name='$hname', num='$num', m_city='$m_city', dir='$dir', city='$city', state='$state', p_code='$p_code', name_h='$name_h', l_name_h='$l_name_h', cell='$cell', db='$db', gender='$gender', db_law='$db_law', h_type = '$h_type', occupation_m='$occupation_m2'  WHERE mail_h = '$email' AND id_home = '$id'; 
UPDATE propertie_control SET  h_name='$hname',  dir='$dir',  city='$city'  WHERE id_home = '$id'";
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