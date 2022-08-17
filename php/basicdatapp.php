<?php
require("connectapp.php");

$result = connect();
$response = array();

$userLogin = $_GET["email"];

$sql_d = "SELECT id_home, mail_h, h_name, num, dir, city, state, p_code, id_m, name_h, l_name_h, db, gender, db_law, cell, occupation_m, h_type, m_city, pet, room, ag_pre, g_pre, pet_num, type_pet, dog, cat, other, y_service, food_s, num_mem, backl FROM pe_home Where pe_home.mail_h = '$userLogin'";
$query_d = $result->query($sql_d);

while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
    $response[] = $start; 
}

echo json_encode(array("data" => $response), JSON_PRETTY_PRINT);
mysqli_close($result);
?>
