<?php
require("connectapp.php");

$result = connect();
$response = array();

$json = file_get_contents('php://input');
$jsonObj = json_decode($json,true);

$userLogin = $jsonObj["userTLogin"];

$sql_d = "SELECT * FROM photo_home INNER JOIN pe_home ON pe_home.mail_h = '$userLogin' and photo_home.id_home = pe_home.id_home INNER JOIN mem_f ON photo_home.id_home = mem_f.id_home INNER JOIN academy ON academy.id_ac = pe_home.a_pre";
$query_d = $result->query($sql_d);

while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
    $response[] = $start; 
}

echo json_encode(array("data" => $response), JSON_PRETTY_PRINT);
?>
