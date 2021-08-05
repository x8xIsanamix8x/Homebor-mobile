<?php
require("connectapp.php");

$result = connect();
$response = array();

$userLogin = $_GET["idnoti"];

$sql_d = "SELECT * FROM notification INNER JOIN pe_student ON notification.id_not = '$userLogin' AND notification.user_i_mail = pe_student.mail_s INNER JOIN academy ON pe_student.n_a = academy.id_ac";
$query_d = $result->query($sql_d);

while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
    $response[] = $start; 
}

echo json_encode(array("data" => $response), JSON_PRETTY_PRINT);
?>
