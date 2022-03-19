<?php
require("connectapp.php");

$result = connect();
$response = array();

$userLogin = $_GET["email"];
$new = $_GET["newE"];
$id = $_GET["idnoti"];

    if($new == "Yes") {
        $sql_d = "SELECT mail_h, room, id_m FROM pe_home WHERE pe_home.mail_h = '$userLogin'";
        $query_d = $result->query($sql_d);

        while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
            $response[] = $start; 
        }

    } else {
        $sql_d = "SELECT mail_h, room, events.* FROM pe_home INNER JOIN events ON pe_home.mail_h = '$userLogin' AND pe_home.mail_h = events.email AND events.id = '$id'";
        $query_d = $result->query($sql_d);

        while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
            $response[] = $start; 
        }
    }

    

echo json_encode(array("data" => $response), JSON_PRETTY_PRINT);
?>
