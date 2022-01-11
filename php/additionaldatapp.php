<?php
require("connectapp.php");

$result = connect();
$response = array();

$userLogin = $_GET["email"];

$sql_d = "SELECT id_home, mail_h, des, num_mem, backg, backl, a_pre, g_pre, ag_pre, status, cell, smoke, pet, pet_num, type_pet, id_m, id_ac, name_a, dir_a, dog, cat, other, vegetarians, halal, kosher, lactose, gluten, pork, none FROM pe_home INNER JOIN academy ON pe_home.mail_h = '$userLogin' AND academy.id_ac = pe_home.a_pre";
$query_d = $result->query($sql_d);

while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
        $response['data'] = $start;
        $cont = 0;
        $sql = "SELECT * FROM academy WHERE id_ac != '0'";
        $query = $result->query($sql);
        while($data = $query->fetch(PDO::FETCH_ASSOC)){
            $response["academy"][$cont]["id_ac"] = $data["id_ac"];
            $response["academy"][$cont]["name_a"] = $data["name_a"];
            $response["academy"][$cont]["dir_a"] = $data["dir_a"];
            $cont++;
        }
        
}

echo json_encode(array($response), JSON_PRETTY_PRINT);
?>

