<?php
require("connectapp.php");

$result = connect();
$response = array();

$userLogin = $_GET["email"];

$sql_d = "SELECT photo_home.*, pe_home.mail_h, pe_home.id_home, pe_home.phome, pe_home.id_m FROM photo_home INNER JOIN pe_home ON pe_home.mail_h = '$userLogin' and photo_home.id_home = pe_home.id_home";
$query_d = $result->query($sql_d);

while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
    $response[] = $start; 
}

echo json_encode(array("data" => $response), JSON_PRETTY_PRINT);
mysqli_close($result);
?>
