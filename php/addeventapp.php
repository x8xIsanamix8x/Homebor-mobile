<?php

require("connectapp.php");

$result = connect();
$response = array();

$title = $_GET["title"];
$roome = $_GET["roome"];
$db1 = $_GET["db1"];
$db2 = $_GET["db2"];
$email = $_GET["email"];
$idm = $_GET["idm"];
$new = $_GET["newE"];
$idnoti = $_GET["idnoti"];
$update = $_GET["update"];

if($roome == 'room1'){
    $color = '#232159';
}
if($roome == 'room2'){
    $color = '#982A72';
}
if($roome == 'room3'){
    $color = '#394893';
}
if($roome == 'room4'){
    $color = '#A54483';
}
if($roome == 'room5'){
    $color = '#5D418D';
}
if($roome == 'room6'){
    $color = '#392B84';
}
if($roome == 'room7'){
    $color = '#B15391';
}
if($roome == 'room8'){
    $color = '#4F177D';
}
if($roome == 'room'){
    $color = 'other';
}

date_default_timezone_set("America/Toronto");
$date = date('Y-m-d');

if ($db2 > $date) {
    $status = 'Active';
} else {
    $status = 'Disabled';
}

if($new == 'Yes') {
    $sql = "INSERT INTO events (`title`, `color`, `room_e`, `start`, `startingDay`, `end`, `endingDay`, `email`, `mail_s`, `height`, `id_m`, `status`) VALUES ('$title', '$color', '$roome', '$db1', 'true', '$db2', 'true', '$email', 'NULL', '80', '$idm', '$status')";
    $query = $result->prepare($sql);
    $res = $query->execute();

    if($res){
        $response["status"] = 1;
    }else{
        $response["status"] = 0;
    }

echo json_encode($response);

} else {
    if($update == 'Yes'){
    $sql = "UPDATE `events` SET title='$title', color='$color', room_e='$roome', start='$db1', end='$db2',  status='$status' WHERE id='$idnoti'";
    $query = $result->prepare($sql);
    $res = $query->execute();

    if($res){
        $response["status"] = 1;
    }else{
        $response["status"] = 0;
    }

    echo json_encode($response);
    
    }else{
        $sql = "DELETE FROM `events` WHERE id='$idnoti'";
        $query = $result->prepare($sql);
        $res = $query->execute();
    
        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    
        echo json_encode($response);
        
    }

}





?>