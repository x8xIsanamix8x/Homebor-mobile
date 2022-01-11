<?php
require("connectapp.php");

$result = connect();
$response = array();

$email = $_GET["email"];
$id = $_GET["idnoti"];

$sql_d = "SELECT reports.*, pe_home.mail_h, pe_home.name_h, pe_home.l_name_h, pe_student.mail_s, pe_student.id_m, manager.id_m, manager.name, manager.l_name, manager.a_name, manager.mail FROM reports INNER JOIN pe_home ON reports.mail_i='$email' AND reports.id_not='$id' AND pe_home.mail_h = reports.mail_i INNER JOIN pe_student ON reports.stu_rep = pe_student.mail_s INNER JOIN manager ON pe_student.id_m = manager.id_m ORDER BY reports.id_r DESC LIMIT 1";
$query_d = $result->query($sql_d);

while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
    $response[] = $start; 
}

echo json_encode(array("data" => $response), JSON_PRETTY_PRINT);
?>
