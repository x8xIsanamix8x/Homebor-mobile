<?php
require("connectapp.php");

$result = connect();
$response = array();

$userLogin = $_GET["mail"];

$sql_d = "SELECT * FROM pe_student INNER JOIN academy ON pe_student.mail_s = '$userLogin' AND pe_student.n_a = academy.id_ac";
$query_d = $result->query($sql_d);

while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
    $response[] = $start; 
}

echo json_encode(array("data" => $response), JSON_PRETTY_PRINT);
?>