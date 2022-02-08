<?php
require("connectapp.php");

$result = connect();
$response = array();

$userLogin = $_GET["email"];

$sql_d = "SELECT mail, name, l_name FROM users WHERE mail = '$userLogin'";
$query_d = $result->query($sql_d);

while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
        $response['data'] = $start;
        $cont = 0;
        $sql = "SELECT events.email, events.mail_s, events.status, notification.*, pe_student.mail_s, pe_student.photo_s, pe_student.id_student, pe_student.id_m, manager.id_m, manager.mail, manager.a_name FROM events INNER JOIN notification ON events.email = '$userLogin' AND events.mail_s != 'NULL' AND events.mail_s = notification.user_i_mail AND events.email = notification.user_r INNER JOIN pe_student ON events.mail_s = pe_student.mail_s INNER JOIN manager ON pe_student.id_m = manager.id_m;";
        $query = $result->query($sql);
        while($data = $query->fetch(PDO::FETCH_ASSOC)){
            $response["studentslist"][$cont]["id"] = $data["id_student"];
            $response["studentslist"][$cont]["id_not"] = $data["id_not"];
            $response["studentslist"][$cont]["photo"] = $data["photo_s"];
            $response["studentslist"][$cont]["room"] = $data["bedrooms"];
            $response["studentslist"][$cont]["user_i_mail"] = $data["user_i_mail"];
            $response["studentslist"][$cont]["name_s"] = $data["user_i"];
            $response["studentslist"][$cont]["l_name_s"] = $data["user_i_l"];
            $response["studentslist"][$cont]["agency"] = $data["a_name"];
            $response["studentslist"][$cont]["managermail"] = $data["mail"];
            $cont++;
        }
}

echo json_encode(array($response), JSON_PRETTY_PRINT);
?>

