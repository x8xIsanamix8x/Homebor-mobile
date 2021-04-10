<?php
require("connectapp.php");

$result = connect();
$response = array();

$json = file_get_contents('php://input');
$jsonObj = json_decode($json,true);

$userLogin = $jsonObj["userTLogin"];

$sql_d = "SELECT * FROM room INNER JOIN pe_home ON pe_home.mail_h = 'a@gmail.com' and room.id_home = pe_home.id_home";
$query_d = $result->query($sql_d);

while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
    $response[] = $start; 
}

echo json_encode(array("data" => $response), JSON_PRETTY_PRINT);
?>
