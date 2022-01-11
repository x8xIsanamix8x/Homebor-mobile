<?php
require("connectapp.php");

$result = connect();
$response = array();

$userLogin = $_GET["email"];

$sql_d = "SELECT pe_home.id_home, pe_home.id_m, pe_home.mail_h, mem_f.* FROM mem_f INNER JOIN pe_home ON pe_home.id_home = mem_f.id_home AND pe_home.mail_h = '$userLogin'";
$query_d = $result->query($sql_d);

while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
    $response[] = $start; 
}

echo json_encode(array("data" => $response), JSON_PRETTY_PRINT);
?>
