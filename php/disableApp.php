<?php

require("connectapp.php");

$result = connect();
$response = array();

$id = $_GET["id"];
$mail_h = $_GET["mail_h"];
$id_m = $_GET["id_m"];
$reason = $_GET["reason"];

date_default_timezone_set("America/Toronto");
$date = date('Y-m-d H:i:s');
$endDate = date('Y-m-d', strtotime($date. ' + 7 days'));

        $sql_d = "SELECT pe_home.id_m, pe_home.name_h, pe_home.l_name_h, pe_home.mail_h, manager.id_m, manager.mail FROM `pe_home` INNER JOIN manager ON pe_home.mail_h = '$mail_h' AND pe_home.id_m = manager.id_m";
        $query_d = $result->query($sql_d);
        
        while($disable = $query_d->fetch(PDO::FETCH_ASSOC)) {
            $sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m, reason) VALUES ('$mail_h', 'Disable a Propertie', '$date', '$mail_h', '$id_m', '$reason');
                    UPDATE users SET status = 'Disable' WHERE mail = '$mail_h';
                    UPDATE pe_home SET status = 'Disable' WHERE mail_h = '$mail_h' AND id_home = '$id';
                    UPDATE propertie_control SET status = 'Disable' WHERE id_home = '$id';
                    INSERT INTO notification (user_i, user_i_l, user_i_mail, start, end_, user_r, date_, state, confirmed, title, des) VALUES ('$disable[name_h]','$disable[l_name_h]','$disable[mail_h]','$date','$endDate','$disable[mail]','$date','0','0','Delete User','$reason')";

            $query = $result->prepare($sql);
            $res = $query->execute();

            if($res){
                $response["status"] = 1;
            }else{
                $response["status"] = 0;
            }

        }




echo json_encode($response);
mysqli_close($result);
?>