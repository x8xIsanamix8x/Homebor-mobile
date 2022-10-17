<?php

    require("connectapp.php");
    $result = connect();
    $response = array();

    $email = $_GET["email"];
    $id = $_GET["id"];
    $idm = $_GET["idm"];
    $disableroom1 = $_GET["disableroom1"];
    $disableroom2 = $_GET["disableroom2"];
    $disableroom3 = $_GET["disableroom3"];
    $disableroom4 = $_GET["disableroom4"];
    $disableroom5 = $_GET["disableroom5"];
    $disableroom6 = $_GET["disableroom6"];
    $disableroom7 = $_GET["disableroom7"];
    $disableroom8 = $_GET["disableroom8"];

    $activeroom1 = $_GET["activeroom1"];
    $activeroom2 = $_GET["activeroom2"];
    $activeroom3 = $_GET["activeroom3"];
    $activeroom4 = $_GET["activeroom4"];
    $activeroom5 = $_GET["activeroom5"];
    $activeroom6 = $_GET["activeroom6"];
    $activeroom7 = $_GET["activeroom7"];
    $activeroom8 = $_GET["activeroom8"];

   
    $date1 = $_GET["date1"];
    $date1_2 = $_GET["date1_2"];
    $date1_3 = $_GET["date1_3"];

    $date2 = $_GET["date2"];
    $date2_2 = $_GET["date2_2"];
    $date2_3 = $_GET["date2_3"];

    $date3 = $_GET["date3"];
    $date3_2 = $_GET["date3_2"];
    $date3_3 = $_GET["date3_3"];

    $date4 = $_GET["date4"];
    $date4_2 = $_GET["date4_2"];
    $date4_3 = $_GET["date4_3"];

    $date5 = $_GET["date5"];
    $date5_2 = $_GET["date5_2"];
    $date5_3 = $_GET["date5_3"];

    $date6 = $_GET["date6"];
    $date6_2 = $_GET["date6_2"];
    $date6_3 = $_GET["date6_3"];

    $date7 = $_GET["date7"];
    $date7_2 = $_GET["date7_2"];
    $date7_3 = $_GET["date7_3"];

    $date8 = $_GET["date8"];
    $date8_2 = $_GET["date8_2"];
    $date8_3 = $_GET["date8_3"];

    if ($date1 == 'NULL') {
        $datedisable1 = $date1;
    } else{
        $datedisable1 = "Disable";
    }
    if ($date1_2 == 'NULL') {
        $datedisable1_2 = $date1_2;
    } else{
        $datedisable1_2 = "Disable";
    }
    if ($date1_3 == 'NULL') {
        $datedisable1_3 = $date1_3;
    } else {
        $datedisable1_3 = "Disable";
    }
    
    if ($date2 == 'NULL') {
        $datedisable2 = $date2;
    } else{
        $datedisable2 = "Disable";
    }
    if ($date2_2 == 'NULL') {
        $datedisable2_2 = $date2_2;
    } else{
        $datedisable2_2 = "Disable";
    }
    if ($date2_3 == 'NULL') {
        $datedisable2_3 = $date2_3;
    } else {
        $datedisable2_3 = "Disable";
    }

    if ($date3 == 'NULL') {
        $datedisable3 = $date3;
    } else{
        $datedisable3 = "Disable";
    }
    if ($date3_2 == 'NULL') {
        $datedisable3_2 = $date3_2;
    } else{
        $datedisable3_2 = "Disable";
    }
    if ($date3_3 == 'NULL') {
        $datedisable3_3 = $date3_3;
    } else {
        $datedisable3_3 = "Disable";
    }

    if ($date4 == 'NULL') {
        $datedisable4 = $date4;
    } else{
        $datedisable4 = "Disable";
    }
    if ($date4_2 == 'NULL') {
        $datedisable4_2 = $date4_2;
    } else{
        $datedisable4_2 = "Disable";
    }
    if ($date4_3 == 'NULL') {
        $datedisable4_3 = $date4_3;
    } else {
        $datedisable4_3 = "Disable";
    }

    if ($date5 == 'NULL') {
        $datedisable5 = $date5;
    } else{
        $datedisable5 = "Disable";
    }
    if ($date5_2 == 'NULL') {
        $datedisable5_2 = $date5_2;
    } else{
        $datedisable5_2 = "Disable";
    }
    if ($date5_3 == 'NULL') {
        $datedisable5_3 = $date5_3;
    } else {
        $datedisable5_3 = "Disable";
    }

    if ($date6 == 'NULL') {
        $datedisable6 = $date6;
    } else{
        $datedisable6 = "Disable";
    }
    if ($date6_2 == 'NULL') {
        $datedisable6_2 = $date6_2;
    } else{
        $datedisable6_2 = "Disable";
    }
    if ($date6_3 == 'NULL') {
        $datedisable6_3 = $date6_3;
    } else {
        $datedisable6_3 = "Disable";
    }

    if ($date7 == 'NULL') {
        $datedisable7 = $date7;
    } else{
        $datedisable7 = "Disable";
    }
    if ($date7_2 == 'NULL') {
        $datedisable7_2 = $date7_2;
    } else{
        $datedisable7_2 = "Disable";
    }
    if ($date7_3 == 'NULL') {
        $datedisable7_3 = $date7_3;
    } else {
        $datedisable7_3 = "Disable";
    }

    if ($date8 == 'NULL') {
        $datedisable8 = $date8;
    } else{
        $datedisable8 = "Disable";
    }
    if ($date8_2 == 'NULL') {
        $datedisable8_2 = $date8_2;
    } else{
        $datedisable8_2 = "Disable";
    }
    if ($date8_3 == 'NULL') {
        $datedisable8_3 = $date8_3;
    } else {
        $datedisable8_3 = "Disable";
    }

    if ($date1 == 'NULL') {
        $dateactive1 = $date1;
    } else{
        $dateactive1 = "Available";
    }
    if ($date1_2 == 'NULL') {
        $dateactive1_2 = $date1_2;
    } else{
        $dateactive1_2 = "Available";
    }
    if ($date1_3 == 'NULL') {
        $dateactive1_3 = $date1_3;
    } else {
        $dateactive1_3 = "Available";
    }
    
    if ($date2 == 'NULL') {
        $dateactive2 = $date2;
    } else{
        $dateactive2 = "Available";
    }
    if ($date2_2 == 'NULL') {
        $dateactive2_2 = $date2_2;
    } else{
        $dateactive2_2 = "Available";
    }
    if ($date2_3 == 'NULL') {
        $dateactive2_3 = $date2_3;
    } else {
        $dateactive2_3 = "Available";
    }

    if ($date3 == 'NULL') {
        $dateactive3 = $date3;
    } else{
        $dateactive3 = "Available";
    }
    if ($date3_2 == 'NULL') {
        $dateactive3_2 = $date3_2;
    } else{
        $dateactive3_2 = "Available";
    }
    if ($date3_3 == 'NULL') {
        $dateactive3_3 = $date3_3;
    } else {
        $dateactive3_3 = "Available";
    }

    if ($date4 == 'NULL') {
        $dateactive4 = $date4;
    } else{
        $dateactive4 = "Available";
    }
    if ($date4_2 == 'NULL') {
        $dateactive4_2 = $date4_2;
    } else{
        $dateactive4_2 = "Available";
    }
    if ($date4_3 == 'NULL') {
        $dateactive4_3 = $date4_3;
    } else {
        $dateactive4_3 = "Available";
    }

    if ($date5 == 'NULL') {
        $dateactive5 = $date5;
    } else{
        $dateactive5 = "Available";
    }
    if ($date5_2 == 'NULL') {
        $dateactive5_2 = $date5_2;
    } else{
        $dateactive5_2 = "Available";
    }
    if ($date5_3 == 'NULL') {
        $dateactive5_3 = $date5_3;
    } else {
        $dateactive5_3 = "Available";
    }

    if ($date6 == 'NULL') {
        $dateactive6 = $date6;
    } else{
        $dateactive6 = "Available";
    }
    if ($date6_2 == 'NULL') {
        $dateactive6_2 = $date6_2;
    } else{
        $dateactive6_2 = "Available";
    }
    if ($date6_3 == 'NULL') {
        $dateactive6_3 = $date6_3;
    } else {
        $dateactive6_3 = "Available";
    }

    if ($date7 == 'NULL') {
        $dateactive7 = $date7;
    } else{
        $dateactive7 = "Available";
    }
    if ($date7_2 == 'NULL') {
        $dateactive7_2 = $date7_2;
    } else{
        $dateactive7_2 = "Available";
    }
    if ($date7_3 == 'NULL') {
        $dateactive7_3 = $date7_3;
    } else {
        $dateactive7_3 = "Available";
    }

    if ($date8 == 'NULL') {
        $dateactive8 = $date8;
    } else{
        $dateactive8 = "Available";
    }
    if ($date8_2 == 'NULL') {
        $dateactive8_2 = $date8_2;
    } else{
        $dateactive8_2 = "Available";
    }
    if ($date8_3 == 'NULL') {
        $dateactive8_3 = $date8_3;
    } else {
        $dateactive8_3 = "Available";
    }


    if($disableroom1 == 'Yes'){
        date_default_timezone_set("America/Toronto");
        $date = date('Y-m-d H:i:s');
    
        $sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Disable Room 1', '$date', '$email', '$idm');
        UPDATE room SET date1='$datedisable1', date1_2='$datedisable1_2', date1_3='$datedisable1_3' WHERE id_home = '$id';";
        $query = $result->prepare($sql);
        $res = $query->execute();
    
        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    
    }

    if($disableroom2 == 'Yes'){
        date_default_timezone_set("America/Toronto");
        $date = date('Y-m-d H:i:s');
    
        $sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Disable Room 2', '$date', '$email', '$idm');
        UPDATE room SET date2='$datedisable2', date2_2='$datedisable2_2', date2_3='$datedisable2_3' WHERE id_home = '$id';";
        $query = $result->prepare($sql);
        $res = $query->execute();
    
        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    
    }

    if($disableroom3 == 'Yes'){
        date_default_timezone_set("America/Toronto");
        $date = date('Y-m-d H:i:s');
    
        $sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Disable Room 3', '$date', '$email', '$idm');
        UPDATE room SET date3='$datedisable3', date3_2='$datedisable3_2', date3_3='$datedisable3_3' WHERE id_home = '$id';";
        $query = $result->prepare($sql);
        $res = $query->execute();
    
        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    
    }

    if($disableroom4 == 'Yes'){
        date_default_timezone_set("America/Toronto");
        $date = date('Y-m-d H:i:s');
    
        $sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Disable Room 4', '$date', '$email', '$idm');
        UPDATE room SET date4='$datedisable4', date4_2='$datedisable4_2', date4_3='$datedisable4_3' WHERE id_home = '$id';";
        $query = $result->prepare($sql);
        $res = $query->execute();
    
        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    
    }

    if($disableroom5 == 'Yes'){
        date_default_timezone_set("America/Toronto");
        $date = date('Y-m-d H:i:s');
    
        $sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Disable Room 5', '$date', '$email', '$idm');
        UPDATE room SET date5='$datedisable5', date5_2='$datedisable5_2', date5_3='$datedisable5_3' WHERE id_home = '$id';";
        $query = $result->prepare($sql);
        $res = $query->execute();
    
        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    
    }

    if($disableroom6 == 'Yes'){
        date_default_timezone_set("America/Toronto");
        $date = date('Y-m-d H:i:s');
    
        $sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Disable Room 6', '$date', '$email', '$idm');
        UPDATE room SET date6='$datedisable6', date6_2='$datedisable6_2', date6_3='$datedisable6_3' WHERE id_home = '$id';";
        $query = $result->prepare($sql);
        $res = $query->execute();
    
        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    
    }

    if($disableroom7 == 'Yes'){
        date_default_timezone_set("America/Toronto");
        $date = date('Y-m-d H:i:s');
    
        $sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Disable Room 7', '$date', '$email', '$idm');
        UPDATE room SET date7='$datedisable7', date7_2='$datedisable7_2', date7_3='$datedisable7_3' WHERE id_home = '$id';";
        $query = $result->prepare($sql);
        $res = $query->execute();
    
        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    
    }

    if($disableroom8 == 'Yes'){
        date_default_timezone_set("America/Toronto");
        $date = date('Y-m-d H:i:s');
    
        $sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Disable Room 8', '$date', '$email', '$idm');
        UPDATE room SET date8='$datedisable8', date8_2='$datedisable8_2', date8_3='$datedisable8_3' WHERE id_home = '$id';";
        $query = $result->prepare($sql);
        $res = $query->execute();
    
        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    
    }

    if($activeroom1 == 'Yes'){
        date_default_timezone_set("America/Toronto");
        $date = date('Y-m-d H:i:s');
    
        $sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Active Room 1', '$date', '$email', '$idm');
        UPDATE room SET date1='$dateactive1', date1_2='$dateactive1_2', date1_3='$dateactive1_3' WHERE id_home = '$id';";
        $query = $result->prepare($sql);
        $res = $query->execute();
    
        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    
    }

    if($activeroom2 == 'Yes'){
        date_default_timezone_set("America/Toronto");
        $date = date('Y-m-d H:i:s');
    
        $sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Active Room 2', '$date', '$email', '$idm');
        UPDATE room SET date2='$dateactive2', date2_2='$dateactive2_2', date2_3='$dateactive2_3' WHERE id_home = '$id';";
        $query = $result->prepare($sql);
        $res = $query->execute();
    
        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    
    }

    if($activeroom3 == 'Yes'){
        date_default_timezone_set("America/Toronto");
        $date = date('Y-m-d H:i:s');
    
        $sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Active Room 3', '$date', '$email', '$idm');
        UPDATE room SET date3='$dateactive3', date3_2='$dateactive3_2', date3_3='$dateactive3_3' WHERE id_home = '$id';";
        $query = $result->prepare($sql);
        $res = $query->execute();
    
        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    
    }

    if($activeroom4 == 'Yes'){
        date_default_timezone_set("America/Toronto");
        $date = date('Y-m-d H:i:s');
    
        $sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Active Room 4', '$date', '$email', '$idm');
        UPDATE room SET date4='$dateactive4', date4_2='$dateactive4_2', date4_3='$dateactive4_3' WHERE id_home = '$id';";
        $query = $result->prepare($sql);
        $res = $query->execute();
    
        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    
    }

    if($activeroom5 == 'Yes'){
        date_default_timezone_set("America/Toronto");
        $date = date('Y-m-d H:i:s');
    
        $sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Active Room 5', '$date', '$email', '$idm');
        UPDATE room SET date5='$dateactive5', date5_2='$dateactive5_2', date5_3='$dateactive5_3' WHERE id_home = '$id';";
        $query = $result->prepare($sql);
        $res = $query->execute();
    
        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    
    }

    if($activeroom6 == 'Yes'){
        date_default_timezone_set("America/Toronto");
        $date = date('Y-m-d H:i:s');
    
        $sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Active Room 6', '$date', '$email', '$idm');
        UPDATE room SET date6='$dateactive6', date6_2='$dateactive6_2', date6_3='$dateactive6_3' WHERE id_home = '$id';";
        $query = $result->prepare($sql);
        $res = $query->execute();
    
        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    
    }

    if($activeroom7 == 'Yes'){
        date_default_timezone_set("America/Toronto");
        $date = date('Y-m-d H:i:s');
    
        $sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Active Room 7', '$date', '$email', '$idm');
        UPDATE room SET date7='$dateactive7', date7_2='$dateactive7_2', date7_3='$dateactive7_3' WHERE id_home = '$id';";
        $query = $result->prepare($sql);
        $res = $query->execute();
    
        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    
    }

    if($activeroom8 == 'Yes'){
        date_default_timezone_set("America/Toronto");
        $date = date('Y-m-d H:i:s');
    
        $sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Active Room 8', '$date', '$email', '$idm');
        UPDATE room SET date8='$dateactive8', date8_2='$dateactive8_2', date8_3='$dateactive8_3' WHERE id_home = '$id';";
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