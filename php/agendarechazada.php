<?php

require("connectapp.php");
require("cript.php");

$result = connect();
$response = array();

$userLogin = $_GET["email"];

$sql_d = "SELECT DISTINCT start FROM events WHERE email = '$userLogin'";
$query_d = $result->query($sql_d);

while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
    $cont = 0;
    $sql = "SELECT events.*, pe_student.id_m, pe_student.n_a, pe_student.mail_s, pe_student.photo_s, academy.id_ac, academy.acronyms, manager.id_m, manager.a_name  FROM events INNER JOIN pe_student ON events.start='$start[start]' AND events.email = '$userLogin' AND events.mail_s = pe_student.mail_s INNER JOIN academy ON pe_student.n_a = academy.id_ac INNER JOIN manager ON pe_student.id_m = manager.id_m";
    $query = $result->query($sql);
    while($data = $query->fetch(PDO::FETCH_ASSOC)){
        $now = strtotime($data["start"]);
        $your_date = strtotime($data["end"]);
        $datediff = $your_date - $now;
        $response[$data["start"]][$cont]["start3"] = round($datediff / (60 * 60 * 24));
        
        //for ($count2 = 0; $cont2 < round($datediff / (60 * 60 * 24)); $count2++) {
        
        //while($cont2 < round($datediff / (60 * 60 * 24))) {
        
        $data["start"] = date("Y-m-d", strtotime($data["start"].'+ '.$cont2.' days'));
        $response[$data["start"]][$cont]["name"] = $data["title"];
        $response[$data["start"]][$cont]["height"] = intval($data["height"]);
        $response[$data["start"]][$cont]["start"] = $data["start"];
        $response[$data["start"]][$cont]["end"] = $data["end"];
        $response[$data["start"]][$cont]["photo"] = $data["photo_s"];
        $response[$data["start"]][$cont]["academy"] = $data["acronyms"];
        $response[$data["start"]][$cont]["agency"] = $data["a_name"];
        $response[$data["start"]][$cont]["room_e"] = $data["room_e"];
        $response[$data["start"]][$cont]["color"] = $data["color"];
        $response[$data["start"]][$cont]["mail_s"] = $data["mail_s"];
        $response[$data["start"]][$cont]["startingDay"] = $data["startingDay"];
        $response[$data["start"]][$cont]["endingDay"] = $data["endingDay"];
            
            $cont2++;
            $cont++;
            
        //}
    }
}


echo json_encode($response);
?>