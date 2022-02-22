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
    $sql = "SELECT * FROM events WHERE email = '$userLogin'";
    $query = $result->query($sql);
    while($data = $query->fetch(PDO::FETCH_ASSOC)){
        $response["notification"][$cont]["start"] = $data["start"];
        $response["notification"][$cont]["end"] = $data["end"];
        $response["notification"][$cont]["startingDay"] = $data["startingDay"];
        $response["notification"][$cont]["endingDay"] = "false";
        $response["notification"][$cont]["color"] = $data["color"];
        $response["notification"][$cont]["title"] = $data["title"];
        $cont++;
    }
}

echo json_encode($response);
?>