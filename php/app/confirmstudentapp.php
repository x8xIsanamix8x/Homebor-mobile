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
    $start = $_GET["start"];
    $name_s = $_GET["name_s"];
    $l_name_s = $_GET["l_name_s"];
    $bedrooms = $_GET["bedrooms"];
    $end = $_GET["end"];
    $idm = $_GET["idm"];
    $agency = $_GET["agency"];
    $des = $_GET["des"];
    $propietor = $name_h.' '.$l_name_h;
    
    if ($bedrooms == "1") {
        $room_e = "room1";
        $color = "#232159";
    }else{}
    
    if ($bedrooms == "2") {
        $room_e = "room2";
        $color = "#982a72";
    }else{}
    
    if ($bedrooms == "3") {
        $room_e = "room3";
        $color = "#394893";
    }else{}
    
    if ($bedrooms == "4") {
        $room_e = "room4";
        $color = "#A54483";
    }else{}
    
    if ($bedrooms == "5") {
        $room_e = "room5";
        $color = "#5D418D";
    }else{}
    
    if ($bedrooms == "6") {
        $room_e = "room6";
        $color = "#392B84";
    }else{}
    
    if ($bedrooms == "7") {
        $room_e = "room7";
        $color = "#B15391";
    }else{}
    
    if ($bedrooms == "8") {
        $room_e = "room8";
        $color = "#4F177D";
    }else{}
    
    $sql_d = "SELECT * FROM room INNER JOIN pe_home ON pe_home.mail_h = '$email' and room.id_home = pe_home.id_home";
    $query_d = $result->query($sql_d);
    
    
    
    while($start2 = $query_d->fetch(PDO::FETCH_ASSOC)) {
    
        
    if($bedrooms == "1"){
    
    	$aproxt = $start2['aprox1'] + $start2['aprox_a1'];
    	$roomO = $start2['reservations1'] + 1;
    
    }else if($bedrooms == "2"){
    
    	$aproxt = $start2['aprox2'] + $start2['aprox_a2'];
    
    }else if($bedrooms == "3"){
    
    	$aproxt = $start2['aprox3'] + $start2['aprox_a3'];
    
    }else if($bedrooms == "4"){
    
    	$aproxt = $start2['aprox4'] + $start2['aprox_a4'];
    
    }else if($bedrooms == "5"){
    
    	$aproxt = $start2['aprox5'] + $start2['aprox_a5'];
    
    }else if($bedrooms == "6"){
    
    	$aproxt = $start2['aprox6'] + $start2['aprox_a6'];
    
    }else if($bedrooms == "7"){
    
    	$aproxt = $start2['aprox7'] + $start2['aprox_a7'];
    
    }else if($bedrooms == "8"){
    
    	$aproxt = $start2['aprox8'] + $start2['aprox_a8'];
    
    }
    
    
    if($bedrooms == "1"){
    
    	$aproxt1 = $start2['aprox1'];
    
    }else if($bedrooms == "2"){
    
    	$aproxt1 = $start2['aprox2'];
    
    }else if($bedrooms == "3"){
    
    	$aproxt1 = $start2['aprox3'];
    
    }else if($bedrooms == "4"){
    
    	$aproxt1 = $start2['aprox4'];
    
    }else if($bedrooms == "5"){
    
    	$aproxt1 = $start2['aprox5'];
    
    }else if($bedrooms == "6"){
    
    	$aproxt1 = $start2['aprox6'];
    
    }else if($bedrooms == "7"){
    
    	$aproxt1 = $start2['aprox7'];
    
    }else if($bedrooms == "8"){
    
    	$aproxt1 = $start2['aprox8'];
    
    }
    
    if($bedrooms == "1"){
    
    	$roomO = $start2['reservations1'] + 1;
    
    }else {
        $roomO = $start2['reservations1'];
    }
    
    if($bedrooms == "2"){
    
    	$roomO2 = $start2['reservations2'] + 1;
    
    }else {
        $roomO2 = $start2['reservations2'];
    }
    
    if($bedrooms == "3"){
    
    	$roomO3 = $start2['reservations3'] + 1;
    
    }else {
        $roomO3 = $start2['reservations3'];
    }
    
    if($bedrooms == "4"){
    
    	$roomO4 = $start2['reservations4'] + 1;
    
    }else {
        $roomO4 = $start2['reservations4'];
    }
    
    if($bedrooms == "5"){
    
    	$roomO5 = $start2['reservations5'] + 1;
    
    }else {
        $roomO5 = $start2['reservations5'];
    }
    
    if($bedrooms == "6"){
    
    	$roomO6 = $start2['reservations6'] + 1;
    
    }else {
        $roomO6 = $start2['reservations6'];
    }
    
    if($bedrooms == "7"){
    
    	$roomO7 = $start2['reservations7'] + 1;
    
    }else {
        $roomO7 = $start2['reservations7'];
    }
    
    if($bedrooms == "8"){
    
    	$roomO8 = $start2['reservations8'] + 1;
    
    } else {
        $roomO8 = $start2['reservations8'];
    }
    
    
    $studentname = $name_s.' '.$l_name_s;
    
    date_default_timezone_set("America/Toronto");
    $date = date('Y-m-d H:i:s');
    
    $date2 = date('Y-m-d');
    
    if ($date2 > $end) {
    
        $sql = "UPDATE notification SET state = '1', confirmed = '1' WHERE user_i_mail = '$mail' AND user_r = '$email' AND id_not = '$idnoti';
            INSERT INTO noti_student (h_name, user_i, user_i_l, user_i_mail, user_r, date_, state, confirmed, des) VALUES ('$h_name', '$name_h', '$l_name_h', '$email', '$mail', '$start', '1', '0', 'Student Confirmed');
            INSERT INTO events (title, color, room_e, bed, start, startingDay, end, endingDay, email, mail_s, height, id_m, status) VALUES ('$studentname', '$color', '$room_e', '$des', '$start', 'true', '$end', 'true', '$email', '$mail', '80', '$idm', 'Disabled');
            INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Confirmed Student', '$date', '$mail', '$idm');
            UPDATE pe_student SET status = 'Homestay Found' WHERE mail_s = '$mail';
            INSERT INTO payments (names, i_mail, r_mail, date_p, title_p, price_p, reserve_s, startr_p, endr_p, roomr_p, status_p, link_p) values ('$propietor', '$email', '$email', '$date', 'Student Arrival', '$aproxt1', '$mail', '$start', '$end', '$room_e', 'Budgeted', 'NULL');
            INSERT INTO payments (names, i_mail, r_mail, date_p, title_p, price_p, reserve_s, startr_p, endr_p, roomr_p, status_p, link_p) values ('$propietor', '$email', '$agency', '$date', 'Student Arrival', '$aproxt', '$mail', '$start', '$end', '$room_e', 'Budgeted', 'NULL')";
        $query = $result->prepare($sql);
        $res = $query->execute();
    
        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    }else{
    
        $sql = "UPDATE notification SET state = '1', confirmed = '1' WHERE user_i_mail = '$mail' AND user_r = '$email' AND id_not = '$idnoti';
        UPDATE room SET reservations1 = '$roomO', reservations2 = '$roomO2', reservations3 = '$roomO3', reservations4 = '$roomO4', reservations5 = '$roomO5', reservations6 = '$roomO6', reservations7 = '$roomO7', reservations8 = '$roomO8' WHERE id_home = '$start2[id_home]';
            INSERT INTO noti_student (h_name, user_i, user_i_l, user_i_mail, user_r, date_, state, confirmed, des) VALUES ('$h_name', '$name_h', '$l_name_h', '$email', '$mail', '$start', '1', '0', 'Student Confirmed');
            INSERT INTO events (title, color, room_e, bed, start, startingDay, end, endingDay, email, mail_s, height, id_m, status) VALUES ('$studentname', '$color', '$room_e', '$des', '$start', 'true', '$end', 'true', '$email', '$mail', '80', '$idm', 'Active');
            INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Confirmed Student', '$date', '$mail', '$idm');
            UPDATE pe_student SET status = 'Homestay Found' WHERE mail_s = '$mail';
            INSERT INTO payments (names, i_mail, r_mail, date_p, title_p, price_p, reserve_s, startr_p, endr_p, roomr_p, status_p, link_p) values ('$propietor', '$email', '$email', '$date', 'Student Arrival', '$aproxt1', '$mail', '$start', '$end', '$room_e', 'Payable', 'NULL');
            INSERT INTO payments (names, i_mail, r_mail, date_p, title_p, price_p, reserve_s, startr_p, endr_p, roomr_p, status_p, link_p) values ('$propietor', '$email', '$agency', '$date', 'Student Arrival', '$aproxt', '$mail', '$start', '$end', '$room_e', 'Payable', 'NULL')";
        $query = $result->prepare($sql);
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

