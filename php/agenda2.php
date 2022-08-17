<?php

require("connectapp.php");
require("cript.php");

$result = connect();
$response = array();

$userLogin = $_GET["email"];

date_default_timezone_set("America/Toronto");
$today = date('Y-m-d');

$sql_d = "SELECT DISTINCT start FROM events WHERE email = '$userLogin'";
$query_d = $result->query($sql_d);

$sql_u = "UPDATE events SET status='Disabled' WHERE end < '$today' AND email = '$userLogin'";
$query_u = $result->query($sql_u);

while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
    $cont = 0;
    $sql = "SELECT events.*, pe_student.id_m, pe_student.n_a, pe_student.mail_s, pe_student.photo_s, academy.id_ac, academy.acronyms, manager.id_m, manager.a_name  FROM events INNER JOIN pe_student ON events.start='$start[start]' AND events.email = '$userLogin' AND events.mail_s = pe_student.mail_s INNER JOIN academy ON pe_student.n_a = academy.id_ac INNER JOIN manager ON pe_student.id_m = manager.id_m";
    $query = $result->query($sql);
    while($data = $query->fetch(PDO::FETCH_ASSOC)){
        $response[$data["start"]][$cont]["name"] = $data["title"];
        $response[$data["start"]][$cont]["height"] = intval($data["height"]);
        $response[$data["start"]][$cont]["start"] = $data["start"];
        $response[$data["start"]][$cont]["end"] = $data["end"];
        $response[$data["start"]][$cont]["photo"] = 'http://homebor.com/'.$data["photo_s"];
        $response[$data["start"]][$cont]["academy"] = $data["acronyms"];
        $response[$data["start"]][$cont]["agency"] = $data["a_name"];
        $response[$data["start"]][$cont]["room_e"] = $data["room_e"];
        $response[$data["start"]][$cont]["color"] = $data["color"];
        $response[$data["start"]][$cont]["mail_s"] = $data["mail_s"];
        $response[$data["start"]][$cont]["id"] = $data["id"];
        $cont++;
    }
}

if (empty($response)) {
    $cont = 0;
    $sql = "SELECT events.*, pe_student.id_m, pe_student.n_a, pe_student.mail_s, pe_student.photo_s, academy.id_ac, academy.acronyms, manager.id_m, manager.a_name  FROM events INNER JOIN pe_student ON events.email = 'NULL' AND events.mail_s = pe_student.mail_s INNER JOIN academy ON pe_student.n_a = academy.id_ac INNER JOIN manager ON pe_student.id_m = manager.id_m";
    $query = $result->query($sql);
    
    while($data = $query->fetch(PDO::FETCH_ASSOC)){
        $response[$data["start"]][$cont]["name"] = $data["title"];
        $response[$data["start"]][$cont]["height"] = intval($data["height"]);
        $response[$data["start"]][$cont]["start"] = $data["start"];
        $response[$data["start"]][$cont]["end"] = $data["end"];
        $response[$data["start"]][$cont]["photo"] = 'http://homebor.com/'.$data["photo_s"];
        $response[$data["start"]][$cont]["academy"] = $data["acronyms"];
        $response[$data["start"]][$cont]["agency"] = $data["a_name"];
        $response[$data["start"]][$cont]["room_e"] = $data["room_e"];
        $response[$data["start"]][$cont]["color"] = $data["color"];
        $response[$data["start"]][$cont]["mail_s"] = $data["mail_s"];
        $response[$data["start"]][$cont]["id"] = $data["id"];
        $cont++;
    }
        
        
    }

echo json_encode($response);
mysqli_close($result);
?>