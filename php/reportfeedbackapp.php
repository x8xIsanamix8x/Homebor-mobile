<?php
require("connectapp.php");

$result = connect();
$response = array();

$userLogin = $_GET["email"];
$idnoti = $_GET["idnoti"];

$sql_d = "SELECT * FROM reports WHERE mail_r='$userLogin' AND id_not='$idnoti' LIMIT 1";
$query_d = $result->query($sql_d);

while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
        $response['data'] = $start;
        $cont = 0;
        $sql = "SELECT * FROM reports WHERE id_not = '$idnoti' ORDER BY id_r DESC ";
        $query = $result->query($sql);
        while($data = $query->fetch(PDO::FETCH_ASSOC)){
            $response["reportslist"][$cont]["names_i"] = $data["names_i"];
            $response["reportslist"][$cont]["mail_i"] = $data["mail_i"];
            $response["reportslist"][$cont]["des"] = $data["des"];
            $response["reportslist"][$cont]["date"] = $data["date"];
            $response["reportslist"][$cont]["id_r"] = $data["id_r"];
            $cont++;
        }
        
}

echo json_encode(array($response), JSON_PRETTY_PRINT);
?>

