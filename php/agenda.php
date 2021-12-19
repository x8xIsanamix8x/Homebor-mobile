<?php

require("connectapp.php");

$result = connect();
$response = array();

$json = file_get_contents('php://input');
$jsonObj = json_decode($json,true);

$userLogin = $jsonObj["userTLogin"];

$sql_d = "SELECT DISTINCT start FROM events WHERE email = '$userLogin'";
$query_d = $result->query($sql_d);

while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
    $cont = 0;
    $sql = "SELECT events.*, pe_student.id_m, pe_student.n_a, pe_student.mail_s, pe_student.photo_s, academy.id_ac, academy.acronyms, manager.id_m, manager.a_name  FROM events INNER JOIN pe_student ON events.start='$start[start]' AND events.mail_s = pe_student.mail_s INNER JOIN academy ON pe_student.n_a = academy.id_ac INNER JOIN manager ON pe_student.id_m = manager.id_m";
    $query = $result->query($sql);
    while($data = $query->fetch(PDO::FETCH_ASSOC)){
        $response[$data["start"]][$cont]["name"] = $data["title"];
        $response[$data["start"]][$cont]["height"] = intval($data["height"]);
        $response[$data["start"]][$cont]["start"] = $data["start"];
        $response[$data["start"]][$cont]["end"] = $data["end"];
        $response[$data["start"]][$cont]["photo"] = $data["photo_s"];
        $response[$data["start"]][$cont]["academy"] = $data["acronyms"];
        $response[$data["start"]][$cont]["agency"] = $data["a_name"];
        $cont++;
    }
}

echo json_encode($response);
?>