<?php
require("connectapp.php");

$result = connect();
$response = array();

$userLogin = $_GET["email"];

$sql_d = "SELECT mail FROM users WHERE mail = '$userLogin'";
$query_d = $result->query($sql_d);

while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
        $response['data'] = $start;
        $cont = 0;
        $sql = "SELECT reports.*, pe_student.mail_s, pe_student.id_m, pe_student.photo_s, manager.id_m, manager.photo FROM reports INNER JOIN users ON users.mail = '$userLogin' AND reports.mail_i = users.mail INNER JOIN pe_student ON reports.stu_rep = pe_student.mail_s INNER JOIN manager ON pe_student.id_m = manager.id_m GROUP BY id_not DESC";
        $query = $result->query($sql);
        while($data = $query->fetch(PDO::FETCH_ASSOC)){
            $response["reportslist"][$cont]["id_not"] = $data["id_not"];
            $response["reportslist"][$cont]["photo_s"] = $data["photo_s"];
            $response["reportslist"][$cont]["photo_m"] = $data["photo"];
            $response["reportslist"][$cont]["status"] = $data["status"];
            $cont++;
        }
        
}

echo json_encode(array($response), JSON_PRETTY_PRINT);
?>

