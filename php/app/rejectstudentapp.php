<?php

    require("connectapp.php");
    
    $result = connect();
    $response = array();
    
    $email = $_GET["email"];
    $mail = $_GET["mail"];
    $idnoti = $_GET["idnoti"];
    $h_name = $_GET["h_name"];
    $name_h = $_GET["name_h"];
    $l_name_h = $_GET["l_name_h"];
    
    date_default_timezone_set("America/Toronto");
    $date = date('Y-m-d H:i:s');
    
    $sql = "UPDATE notification SET state = '1', confirmed = '1', status = 'Rejected' WHERE user_i_mail = '$mail' AND user_r = '$email' AND id_not = '$idnoti';
    INSERT INTO noti_student( h_name, user_i, user_i_l, user_i_mail, user_r, date_, state, confirmed, des) values ('$h_name', '$name_h', '$l_name_h', '$email', '$mail', '$date', '0', '0', 'Rejected');
    UPDATE pe_student SET status= 'Search for Homestay' WHERE mail_s = '$mail'";
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

