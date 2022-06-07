<?php
require("connectapp.php");

$result = connect();
$response = array();

$userLogin = $_GET["email"];
$idnoti = $_GET["idnoti"];

$sql_d = "SELECT * FROM reports WHERE mail_i='$userLogin' AND id_not='$idnoti' LIMIT 1";
$query_d = $result->query($sql_d);

while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
        $response['data'] = $start;
        $cont = 0;
        $sql = "SELECT *, DATE_FORMAT(date, '%m-%d-%Y %H:%i'), DATE_FORMAT(date, '%m-%d-%Y') as day_messages,  DATE_FORMAT(date, '%H:%i') as hour_messages FROM reports WHERE id_not = '$idnoti' ORDER BY id_r ASC";
        $query = $result->query($sql);
        while($data = $query->fetch(PDO::FETCH_ASSOC)){
            
            $response["reportslist"][$cont]["names_i"] = $data["names_i"];
            $response["reportslist"][$cont]["mail_i"] = $data["mail_i"];
            $response["reportslist"][$cont]["des"] = $data["des"];
            $response["reportslist"][$cont]["date"] = $data["DATE_FORMAT(date, '%Y-%m-%d %H:%i')"];
            $response["reportslist"][$cont]["day_messages"] = $data["day_messages"];
            $response["reportslist"][$cont]["hour_messages"] = $data["hour_messages"];
            $response["reportslist"][$cont]["id_r"] = $data["id_r"];
            $response["reportslist"][$cont]["report_img"] = $data["report_img"];
            $response["reportslist"][$cont]["view"] = $data["view_a"];
            $response["reportslist"][$cont]["count"] = $cont;
            $cont++;
        }
        $sql2 = "UPDATE `reports` SET `view_h`='1' WHERE id_not = '$idnoti'";
        $query2 = $result->query($sql2);
        
}

echo json_encode(array($response), JSON_PRETTY_PRINT);
mysqli_close($result);
?>

