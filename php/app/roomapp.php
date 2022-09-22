<?php

    require("connectapp.php");
    
    $result = connect();
    $response = array();
    
    $userLogin = $_GET["email"];
    
    $sql_d = "SELECT pe_home.id_home, pe_home.mail_h, pe_home.room, room.*, photo_home.* FROM room INNER JOIN pe_home ON pe_home.mail_h = '$userLogin' and room.id_home = pe_home.id_home INNER JOIN photo_home ON room.id_home = photo_home.id_home";
    $query_d = $result->query($sql_d);
    
    while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
            $response['data'] = $start;
            $cont = 0;
            $sql = "SELECT pe_home.mail_h, events.*, pe_student.mail_s, pe_student.n_a, pe_student.photo_s, academy.id_ac, academy.name_a FROM pe_home INNER JOIN events ON pe_home.mail_h = '$userLogin' and events.email = pe_home.mail_h AND events.room_e = 'room1' INNER JOIN pe_student ON events.mail_s = pe_student.mail_s INNER JOIN academy ON pe_student.n_a = academy.id_ac;";
            $query = $result->query($sql);
            while($data = $query->fetch(PDO::FETCH_ASSOC)){
                $response[$data["room_e"]][$cont]["title"] = $data["title"];
                $response[$data["room_e"]][$cont]["start"] = $data["start"];
                $response[$data["room_e"]][$cont]["end"] = $data["end"];
                $response[$data["room_e"]][$cont]["id_e"] = $data["id"];
                $response[$data["room_e"]][$cont]["bed"] = $data["bed"];
                $response[$data["room_e"]][$cont]["academy"] = $data["name_a"];
                $response[$data["room_e"]][$cont]["photo_s"] = $data["photo_s"];
                $response[$data["room_e"]][$cont]["mail_s"] = $data["mail_s"];
                $cont++;
            }
            $sql2 = "SELECT pe_home.mail_h, events.*, pe_student.mail_s, pe_student.n_a, pe_student.photo_s, academy.id_ac, academy.name_a FROM pe_home INNER JOIN events ON pe_home.mail_h = '$userLogin' and events.email = pe_home.mail_h AND events.room_e = 'room2' INNER JOIN pe_student ON events.mail_s = pe_student.mail_s INNER JOIN academy ON pe_student.n_a = academy.id_ac;";
            $query = $result->query($sql2);
            $cont2 = 0;
            while($data = $query->fetch(PDO::FETCH_ASSOC)){
                $response[$data["room_e"]][$cont2]["title"] = $data["title"];
                $response[$data["room_e"]][$cont2]["start"] = $data["start"];
                $response[$data["room_e"]][$cont2]["end"] = $data["end"];
                $response[$data["room_e"]][$cont2]["id_e"] = $data["id"];
                $response[$data["room_e"]][$cont2]["bed"] = $data["bed"];
                $response[$data["room_e"]][$cont2]["academy"] = $data["name_a"];
                $response[$data["room_e"]][$cont2]["photo_s"] = $data["photo_s"];
                $response[$data["room_e"]][$cont2]["mail_s"] = $data["mail_s"];
                $cont2++;
            }
            $sql3 = "SELECT pe_home.mail_h, events.*, pe_student.mail_s, pe_student.n_a, pe_student.photo_s, academy.id_ac, academy.name_a FROM pe_home INNER JOIN events ON pe_home.mail_h = '$userLogin' and events.email = pe_home.mail_h AND events.room_e = 'room3' INNER JOIN pe_student ON events.mail_s = pe_student.mail_s INNER JOIN academy ON pe_student.n_a = academy.id_ac;";
            $query = $result->query($sql3);
            $cont3 = 0;
            while($data = $query->fetch(PDO::FETCH_ASSOC)){
                $response[$data["room_e"]][$cont3]["title"] = $data["title"];
                $response[$data["room_e"]][$cont3]["start"] = $data["start"];
                $response[$data["room_e"]][$cont3]["end"] = $data["end"];
                $response[$data["room_e"]][$cont3]["id_e"] = $data["id"];
                $response[$data["room_e"]][$cont3]["bed"] = $data["bed"];
                $response[$data["room_e"]][$cont3]["academy"] = $data["name_a"];
                $response[$data["room_e"]][$cont3]["photo_s"] = $data["photo_s"];
                $response[$data["room_e"]][$cont3]["mail_s"] = $data["mail_s"];
                $cont3++;
            }
            $sql4 = "SELECT pe_home.mail_h, events.*, pe_student.mail_s, pe_student.n_a, pe_student.photo_s, academy.id_ac, academy.name_a FROM pe_home INNER JOIN events ON pe_home.mail_h = '$userLogin' and events.email = pe_home.mail_h AND events.room_e = 'room4' INNER JOIN pe_student ON events.mail_s = pe_student.mail_s INNER JOIN academy ON pe_student.n_a = academy.id_ac;";
            $query = $result->query($sql4);
            $cont4 = 0;
            while($data = $query->fetch(PDO::FETCH_ASSOC)){
                $response[$data["room_e"]][$cont4]["title"] = $data["title"];
                $response[$data["room_e"]][$cont4]["start"] = $data["start"];
                $response[$data["room_e"]][$cont4]["end"] = $data["end"];
                $response[$data["room_e"]][$cont4]["id_e"] = $data["id"];
                $response[$data["room_e"]][$cont4]["bed"] = $data["bed"];
                $response[$data["room_e"]][$cont4]["academy"] = $data["name_a"];
                $response[$data["room_e"]][$cont4]["photo_s"] = $data["photo_s"];
                $response[$data["room_e"]][$cont4]["mail_s"] = $data["mail_s"];
                $cont4++;
            }
            $sql5 = "SELECT pe_home.mail_h, events.*, pe_student.mail_s, pe_student.n_a, pe_student.photo_s, academy.id_ac, academy.name_a FROM pe_home INNER JOIN events ON pe_home.mail_h = '$userLogin' and events.email = pe_home.mail_h AND events.room_e = 'room5' INNER JOIN pe_student ON events.mail_s = pe_student.mail_s INNER JOIN academy ON pe_student.n_a = academy.id_ac;";
            $query = $result->query($sql5);
            $cont5 = 0;
            while($data = $query->fetch(PDO::FETCH_ASSOC)){
                $response[$data["room_e"]][$cont5]["title"] = $data["title"];
                $response[$data["room_e"]][$cont5]["start"] = $data["start"];
                $response[$data["room_e"]][$cont5]["end"] = $data["end"];
                $response[$data["room_e"]][$cont5]["id_e"] = $data["id"];
                $response[$data["room_e"]][$cont5]["bed"] = $data["bed"];
                $response[$data["room_e"]][$cont5]["academy"] = $data["name_a"];
                $response[$data["room_e"]][$cont5]["photo_s"] = $data["photo_s"];
                $response[$data["room_e"]][$cont5]["mail_s"] = $data["mail_s"];
                $cont5++;
            }
            $sql6 = "SELECT pe_home.mail_h, events.*, pe_student.mail_s, pe_student.n_a, pe_student.photo_s, academy.id_ac, academy.name_a FROM pe_home INNER JOIN events ON pe_home.mail_h = '$userLogin' and events.email = pe_home.mail_h AND events.room_e = 'room6' INNER JOIN pe_student ON events.mail_s = pe_student.mail_s INNER JOIN academy ON pe_student.n_a = academy.id_ac;";
            $query = $result->query($sql6);
            $cont6 = 0;
            while($data = $query->fetch(PDO::FETCH_ASSOC)){
                $response[$data["room_e"]][$cont6]["title"] = $data["title"];
                $response[$data["room_e"]][$cont6]["start"] = $data["start"];
                $response[$data["room_e"]][$cont6]["end"] = $data["end"];
                $response[$data["room_e"]][$cont6]["id_e"] = $data["id"];
                $response[$data["room_e"]][$cont6]["bed"] = $data["bed"];
                $response[$data["room_e"]][$cont6]["academy"] = $data["name_a"];
                $response[$data["room_e"]][$cont6]["photo_s"] = $data["photo_s"];
                $response[$data["room_e"]][$cont6]["mail_s"] = $data["mail_s"];
                $cont6++;
            }
            $sql7 = "SELECT pe_home.mail_h, events.*, pe_student.mail_s, pe_student.n_a, pe_student.photo_s, academy.id_ac, academy.name_a FROM pe_home INNER JOIN events ON pe_home.mail_h = '$userLogin' and events.email = pe_home.mail_h AND events.room_e = 'room7' INNER JOIN pe_student ON events.mail_s = pe_student.mail_s INNER JOIN academy ON pe_student.n_a = academy.id_ac;";
            $query = $result->query($sql7);
            $cont7 = 0;
            while($data = $query->fetch(PDO::FETCH_ASSOC)){
                $response[$data["room_e"]][$cont7]["title"] = $data["title"];
                $response[$data["room_e"]][$cont7]["start"] = $data["start"];
                $response[$data["room_e"]][$cont7]["end"] = $data["end"];
                $response[$data["room_e"]][$cont7]["id_e"] = $data["id"];
                $response[$data["room_e"]][$cont7]["bed"] = $data["bed"];
                $response[$data["room_e"]][$cont7]["academy"] = $data["name_a"];
                $response[$data["room_e"]][$cont7]["photo_s"] = $data["photo_s"];
                $response[$data["room_e"]][$cont7]["mail_s"] = $data["mail_s"];
                $cont7++;
            }
            $sql8 = "SELECT pe_home.mail_h, events.*, pe_student.mail_s, pe_student.n_a, pe_student.photo_s, academy.id_ac, academy.name_a FROM pe_home INNER JOIN events ON pe_home.mail_h = '$userLogin' and events.email = pe_home.mail_h AND events.room_e = 'room8' INNER JOIN pe_student ON events.mail_s = pe_student.mail_s INNER JOIN academy ON pe_student.n_a = academy.id_ac;";
            $query = $result->query($sql8);
            $cont8 = 0;
            while($data = $query->fetch(PDO::FETCH_ASSOC)){
                $response[$data["room_e"]][$cont8]["title"] = $data["title"];
                $response[$data["room_e"]][$cont8]["start"] = $data["start"];
                $response[$data["room_e"]][$cont8]["end"] = $data["end"];
                $response[$data["room_e"]][$cont8]["id_e"] = $data["id"];
                $response[$data["room_e"]][$cont8]["bed"] = $data["bed"];
                $response[$data["room_e"]][$cont8]["academy"] = $data["name_a"];
                $response[$data["room_e"]][$cont8]["photo_s"] = $data["photo_s"];
                $response[$data["room_e"]][$cont8]["mail_s"] = $data["mail_s"];
                $cont8++;
            }
            
    }
    
    echo json_encode(array($response), JSON_PRETTY_PRINT);
    mysqli_close($result);

?>

