<?php
require("connectapp.php");

$result = connect();
$response = array();

$userLogin = $_GET["mail"];

$sql_d = "SELECT report_s, status FROM notification WHERE report_s='$userLogin' AND status='Active'";
$query_d = $result->query($sql_d);

while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
    $response[] = $start; 
}

echo json_encode(array("data" => $response), JSON_PRETTY_PRINT);
?>
