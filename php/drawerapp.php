<?php
require("connectapp.php");

$result = connect();
$response = array();

$userLogin = $_GET["email"];

$sql_d = "SELECT pe_home.id_home, pe_home.name_h, pe_home.l_name_h, pe_home.mail_h, pe_home.phome, photo_home.id_home, photo_home.fp FROM photo_home INNER JOIN pe_home ON pe_home.mail_h = '$userLogin' AND pe_home.id_home = photo_home.id_home";
$query_d = $result->query($sql_d);

while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
    $response[] = $start; 
}

echo json_encode(array("data" => $response), JSON_PRETTY_PRINT);
?>
