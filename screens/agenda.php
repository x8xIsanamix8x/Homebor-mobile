<?php

require("connectapp.php");

$result = connect();
$response = array();

$sql_d = "SELECT 'start' from events";
$query_d = $result->query($sql_d);

while($date = $query_d->fetch(PDO::FETCH_ASSOC)) {
    $cont = 0;
    $sql = "SELECT *FROM events WHERE start='$date[date]'";
    $query = $result->query($sql);
    while($data = $query->fetch(PDO::FETCH_ASSOC)){
        $response[$data["date"]][$cont]["name"] = $data["name"];
        $response[$data["date"]][$cont]["color"] = intval$data["color"];
        $cont++;
    }
}

echo json_encode($response);