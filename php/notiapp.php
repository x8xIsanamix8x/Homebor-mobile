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
        $sql = "SELECT * FROM notification INNER JOIN users ON users.mail = '$userLogin' AND notification.user_r = users.mail INNER JOIN pe_student ON notification.user_i_mail = pe_student.mail_s ORDER BY id_not DESC";
        $query = $result->query($sql);
        while($data = $query->fetch(PDO::FETCH_ASSOC)){
            $response["notification"][$cont]["title"] = $data["title"];
            $response["notification"][$cont]["user_i"] = $data["user_i"];
            $response["notification"][$cont]["user_i_l"] = $data["user_i_l"];
            $response["notification"][$cont]["room"] = $data["bedrooms"];
            $response["notification"][$cont]["start"] = $data["start"];
            $response["notification"][$cont]["end"] = $data["end_"];
            $response["notification"][$cont]["id_s"] = $data["id_student"];
            $response["notification"][$cont]["photo"] = $data["photo_s"];
            $response["notification"][$cont]["id"] = $data["id_not"];
            $response["notification"][$cont]["confirmed"] = $data["confirmed"];
            $cont++;
        }
        
}

echo json_encode(array($response), JSON_PRETTY_PRINT);
?>

