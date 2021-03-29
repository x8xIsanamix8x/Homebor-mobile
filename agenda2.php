<?php

require("connectapp.php");

$result = connect();
$response = array();

$json = file_get_contents('php://input');
$jsonObj = json_decode($json,true);

$userLogin = $jsonObj["userLogin"];

$sql_d = "SELECT DISTINCT start FROM events";
$query_d = $result->query($sql_d);

while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
    $cont = 0;
    $sql = "SELECT * FROM events WHERE start='$start[start]' AND email = '$userLogin'";
    $query = $result->query($sql);
    while($data = $query->fetch(PDO::FETCH_ASSOC)){
        $response[$data["start"]][$cont]["name"] = $data["title"];
        $response[$data["start"]][$cont]["height"] = intval($data["height"]);
        $cont++;
    }
}

echo json_encode($response);
?>
