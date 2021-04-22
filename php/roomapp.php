<?php
require("connectapp.php");

$result = connect();
$response = array();

$json = file_get_contents('php://input');
$jsonObj = json_decode($json,true);

$userLogin = $jsonObj["userTLogin"];

$sql_d = "SELECT pe_home.id_home, pe_home.mail_h, room.*, photo_home.* FROM room INNER JOIN pe_home ON pe_home.mail_h = 'a@gmail.com' and room.id_home = pe_home.id_home INNER JOIN photo_home ON room.id_home = photo_home.id_home";
$query_d = $result->query($sql_d);

while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
        $response['data'] = $start;
        $cont = 0;
        $sql = "SELECT * FROM pe_home INNER JOIN events ON pe_home.mail_h = 'a@gmail.com' and events.email = pe_home.mail_h";
        $query = $result->query($sql);
        while($data = $query->fetch(PDO::FETCH_ASSOC)){
            $response[$data["room"]][$cont]["title"] = $data["title"];
            $response[$data["room"]][$cont]["start"] = $data["start"];
            $response[$data["room"]][$cont]["end"] = $data["end"];
            $cont++;
        }
}

echo json_encode(array($response), JSON_PRETTY_PRINT);
?>

