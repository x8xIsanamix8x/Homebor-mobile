<?php
require("connectapp.php");

$result = connect();
$response = array();

$userLogin = $_GET["email"];

$sql_d = "SELECT id_home, mail_h, des, num_mem, backg, backl, a_pre, g_pre, ag_pre, status, cell, smoke, pet, pet_num, type_pet, id_m, id_ac, name_a, dir_a FROM pe_home INNER JOIN academy ON pe_home.mail_h = '$userLogin' AND academy.id_ac = pe_home.a_pre";
$query_d = $result->query($sql_d);

while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
    $response[] = $start; 
}

echo json_encode(array("data" => $response), JSON_PRETTY_PRINT);
?>
