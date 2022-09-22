<?php

    require("connectapp.php");

    $result = connect();
    $response = array();

    $userLogin = $_GET["email"];

    $sql_d = "SELECT DISTINCT start FROM events WHERE email = '$userLogin'";
    $query_d = $result->query($sql_d);

        while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
            $cont = 0;
            $sql = "SELECT events.*, pe_student.id_m, pe_student.n_a, pe_student.mail_s, pe_student.photo_s, academy.id_ac, academy.acronyms, manager.id_m, manager.a_name  FROM events INNER JOIN pe_student ON events.email = '$userLogin' AND events.mail_s = pe_student.mail_s AND events.status = 'Active' INNER JOIN academy ON pe_student.n_a = academy.id_ac INNER JOIN manager ON pe_student.id_m = manager.id_m";
            $query = $result->query($sql);
            
            while($data = $query->fetch(PDO::FETCH_ASSOC)){
                $response["notification"][$cont]["start"] = $data["start"];
                $response["notification"][$cont]["end"] = $data["end"];
                $response["notification"][$cont]["startingDay"] = $data["startingDay"];
                $response["notification"][$cont]["endingDay"] = "false";
                $response["notification"][$cont]["color"] = $data["color"];
                $response["notification"][$cont]["title"] = $data["title"];
                $response["notification"][$cont]["room_e"] = $data["room_e"];
                $response["notification"][$cont]["academy"] = $data["acronyms"];
                $response["notification"][$cont]["agency"] = $data["a_name"];
                $response["notification"][$cont]["photo"] = 'http://homebor.com/'.$data["photo_s"];
                $response["notification"][$cont]["mail_s"] = $data["mail_s"];
                $response["notification"][$cont]["status"] = $data["status"];
                $response["notification"][$cont]["id"] = $data["id"];
                $cont++;
            }
        }

        

    echo json_encode($response);
    mysqli_close($result);
?>