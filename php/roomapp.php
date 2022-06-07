<?php
require("connectapp.php");

$result = connect();
$response = array();

$userLogin = $_GET["email"];

$sql_d = "SELECT pe_home.id_home, pe_home.mail_h, room.*, photo_home.* FROM room INNER JOIN pe_home ON pe_home.mail_h = '$userLogin' and room.id_home = pe_home.id_home INNER JOIN photo_home ON room.id_home = photo_home.id_home";
$query_d = $result->query($sql_d);

while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
        $response['data'] = $start;
        $cont = 0;
        $sql = "SELECT * FROM pe_home INNER JOIN events ON pe_home.mail_h = '$userLogin' and events.email = pe_home.mail_h AND events.room_e = 'room1'";
        $query = $result->query($sql);
        while($data = $query->fetch(PDO::FETCH_ASSOC)){
            $response[$data["room_e"]][$cont]["title"] = $data["title"];
            $response[$data["room_e"]][$cont]["start"] = $data["start"];
            $response[$data["room_e"]][$cont]["end"] = $data["end"];
            $response[$data["room_e"]][$cont]["id_e"] = $data["id"];
            $cont++;
        }
        $sql2 = "SELECT * FROM pe_home INNER JOIN events ON pe_home.mail_h = '$userLogin' and events.email = pe_home.mail_h AND events.room_e = 'room2'";
        $query = $result->query($sql2);
        $cont2 = 0;
        while($data = $query->fetch(PDO::FETCH_ASSOC)){
            $response[$data["room_e"]][$cont2]["title"] = $data["title"];
            $response[$data["room_e"]][$cont2]["start"] = $data["start"];
            $response[$data["room_e"]][$cont2]["end"] = $data["end"];
            $response[$data["room_e"]][$cont2]["id_e"] = $data["id"];
            $cont2++;
        }
        $sql3 = "SELECT * FROM pe_home INNER JOIN events ON pe_home.mail_h = '$userLogin' and events.email = pe_home.mail_h AND events.room_e = 'room3'";
        $query = $result->query($sql3);
        $cont3 = 0;
        while($data = $query->fetch(PDO::FETCH_ASSOC)){
            $response[$data["room_e"]][$cont3]["title"] = $data["title"];
            $response[$data["room_e"]][$cont3]["start"] = $data["start"];
            $response[$data["room_e"]][$cont3]["end"] = $data["end"];
            $response[$data["room_e"]][$cont3]["id_e"] = $data["id"];
            $cont3++;
        }
        $sql4 = "SELECT * FROM pe_home INNER JOIN events ON pe_home.mail_h = '$userLogin' and events.email = pe_home.mail_h AND events.room_e = 'room4'";
        $query = $result->query($sql4);
        $cont4 = 0;
        while($data = $query->fetch(PDO::FETCH_ASSOC)){
            $response[$data["room_e"]][$cont4]["title"] = $data["title"];
            $response[$data["room_e"]][$cont4]["start"] = $data["start"];
            $response[$data["room_e"]][$cont4]["end"] = $data["end"];
            $response[$data["room_e"]][$cont4]["id_e"] = $data["id"];
            $cont4++;
        }
        $sql5 = "SELECT * FROM pe_home INNER JOIN events ON pe_home.mail_h = '$userLogin' and events.email = pe_home.mail_h AND events.room_e = 'room4'";
        $query = $result->query($sql5);
        $cont5 = 0;
        while($data = $query->fetch(PDO::FETCH_ASSOC)){
            $response[$data["room_e"]][$cont5]["title"] = $data["title"];
            $response[$data["room_e"]][$cont5]["start"] = $data["start"];
            $response[$data["room_e"]][$cont5]["end"] = $data["end"];
            $response[$data["room_e"]][$cont5]["id_e"] = $data["id"];
            $cont5++;
        }
        $sql6 = "SELECT * FROM pe_home INNER JOIN events ON pe_home.mail_h = '$userLogin' and events.email = pe_home.mail_h AND events.room_e = 'room4'";
        $query = $result->query($sql6);
        $cont6 = 0;
        while($data = $query->fetch(PDO::FETCH_ASSOC)){
            $response[$data["room_e"]][$cont6]["title"] = $data["title"];
            $response[$data["room_e"]][$cont6]["start"] = $data["start"];
            $response[$data["room_e"]][$cont6]["end"] = $data["end"];
            $response[$data["room_e"]][$cont6]["id_e"] = $data["id"];
            $cont6++;
        }
        $sql7 = "SELECT * FROM pe_home INNER JOIN events ON pe_home.mail_h = '$userLogin' and events.email = pe_home.mail_h AND events.room_e = 'room4'";
        $query = $result->query($sql7);
        $cont7 = 0;
        while($data = $query->fetch(PDO::FETCH_ASSOC)){
            $response[$data["room_e"]][$cont7]["title"] = $data["title"];
            $response[$data["room_e"]][$cont7]["start"] = $data["start"];
            $response[$data["room_e"]][$cont7]["end"] = $data["end"];
            $response[$data["room_e"]][$cont7]["id_e"] = $data["id"];
            $cont7++;
        }
        $sql8 = "SELECT * FROM pe_home INNER JOIN events ON pe_home.mail_h = '$userLogin' and events.email = pe_home.mail_h AND events.room_e = 'room4'";
        $query = $result->query($sql8);
        $cont8 = 0;
        while($data = $query->fetch(PDO::FETCH_ASSOC)){
            $response[$data["room_e"]][$cont8]["title"] = $data["title"];
            $response[$data["room_e"]][$cont8]["start"] = $data["start"];
            $response[$data["room_e"]][$cont8]["end"] = $data["end"];
            $response[$data["room_e"]][$cont8]["id_e"] = $data["id"];
            $cont8++;
        }
        
}

echo json_encode(array($response), JSON_PRETTY_PRINT);
mysqli_close($result);
?>

