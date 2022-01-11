<?php

require("connectapp.php");

$result = connect();
$response = array();

$name_h = $_GET["name_h"];
$l_name_h = $_GET["l_name_h"];
$email = $_GET["email"];
$managermail = $_GET["managermail"];
$agency = $_GET["agency"];
$mail = $_GET["mail"];
$des = $_GET["des"];
$idnoti = $_GET["idnoti"];
$report = $_GET["report"];
$bedrooms = $_GET["bedrooms"];
$photo1 = $_GET["photo1"];

$user = $name_h.' '.$l_name_h;

date_default_timezone_set("America/Toronto");
$date = date('Y-m-d H:i:s');

if($photo1 != 'yes'){

        $sql = "INSERT INTO notification (user_i, user_i_l, user_i_mail, bedrooms, user_r, date_, state, confirmed, title, des, report_s, status) VALUES ('$name_h', '$l_name_h', '$email', '$bedrooms', '$managermail', '$date', '0', '0', '$report', '$des', '$mail', 'Active');
        INSERT INTO reports (names_i, mail_i, names_r, mail_r, stu_rep, title, des, date, status, id_not) VALUES ('$user', '$email', '$agency', '$managermail', '$mail', '$report', '$des', '$date', 'Active', Last_insert_id())";
        $query = $result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    }else{
        $sql2 = "INSERT INTO notification (user_i, user_i_l, user_i_mail, bedrooms, user_r, date_, state, confirmed, title, des, report_s, status) VALUES ('$name_h', '$l_name_h', '$email', '$bedrooms', '$managermail', '$date', '0', '0', '$report', '$des', '$mail', 'Active');";
        $query2 = $result->query($sql2);

        $sql3 = "SELECT * FROM notification WHERE user_i_mail = '$email' AND user_r = '$managermail' AND title = '$report' AND des = '$des' AND report_s = '$mail' LIMIT 1";
        $query3 = $result->query($sql3);
        $data = $query3->fetch(PDO::FETCH_ASSOC);
        $id_not = $data["id_not"];

        $path='./public/'.$email.'/Reports/'.$id_not.'/';

        if (file_exists($path)) {
        }else { mkdir('./public/'.$email.'/Reports/'.$id_not.'/', 0755);}

        $img_path='./public/'.$email.'/Reports/'.$id_not.'/'.$_FILES['photo']['name'];
        $img_path2='/public/'.$email.'/Reports/'.$id_not.'/'.$_FILES['photo']['name'];
        //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
        if(move_uploaded_file($_FILES['photo']['tmp_name'],$img_path)){
        $sql="INSERT INTO reports (names_i, mail_i, names_r, mail_r, stu_rep, title, des, date, status, id_not, report_img) VALUES ('$user', '$email', '$agency', '$managermail', '$mail', '$report', '$des', '$date', 'Active', '$id_not', '$img_path2')";
        $img_pathComplete='http://homebor.com/public/'.$email.'/Reports/'.$id_not.'/'.$_FILES['photo']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    }
}


echo json_encode($response);

?>

