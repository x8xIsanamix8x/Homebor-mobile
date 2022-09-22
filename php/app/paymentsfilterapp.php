<?php

    require("connectapp.php");
    
    $result = connect();
    $response = array();
    
    $userLogin = $_GET["email"];
    
    $userLogin = $_GET["email"];
    $db1 = $_GET["db1"];
    $db2 = $_GET["db2"];
    
    $sql_d = "SELECT mail FROM users WHERE mail = '$userLogin'";
    $query_d = $result->query($sql_d);
    
    while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
            $response['data'] = $start;
            $cont = 0;
            $sql = "SELECT payments.*, pe_student.name_s, pe_student.l_name_s, pe_student.mail_s, pe_student.photo_s, DATE_FORMAT(date_p, '%Y-%m-%d') FROM `payments` INNER JOIN pe_student ON payments.r_mail = '$userLogin' AND payments.reserve_s = pe_student.mail_s  AND date_p >= '$db1' AND date_p <= '$db2' ORDER BY id_p DESC";
            $query = $result->query($sql);
            while($data = $query->fetch(PDO::FETCH_ASSOC)){
                $firstDate = new DateTime($data["startr_p"]);
                //Create a DateTime object for the second date.
                $secondDate = new DateTime($data["endr_p"]);
                //Get the difference between the two dates in days.
                $differenceInDays = $firstDate->diff($secondDate)->days;
                //Divide the days by 7
                $differenceInWeeks = $differenceInDays / 7;
                $differences = ceil($differenceInWeeks);
            
                $HowManyWeeks = date( 'y/m/d', strtotime( $data["endr_p"] ) ) - date( 'y/m/d', strtotime( $data["startr_p"] ) );
                $response["reportslist"][$cont]["id_p"] = $data["id_p"];
                $response["reportslist"][$cont]["photo_s"] = $data["photo_s"];
                $response["reportslist"][$cont]["date_p"] = $data["date_p"];
                $response["reportslist"][$cont]["status_p"] = $data["status_p"];
                $response["reportslist"][$cont]["name_s"] = $data["name_s"];
                $response["reportslist"][$cont]["l_name_s"] = $data["l_name_s"];
                $response["reportslist"][$cont]["date"] = $data["DATE_FORMAT(date_p, '%Y-%m-%d')"];
                $response["reportslist"][$cont]["price"] = $data["price_p"];
                $response["reportslist"][$cont]["room_p"] = $data["roomr_p"];
                $response["reportslist"][$cont]["start"] = $data["startr_p"];
                $response["reportslist"][$cont]["end"] = $data["endr_p"];
                $response["reportslist"][$cont]["week"] = $differences;
                $cont++;
            }
            
    }
        
    
    
    
    echo json_encode(array($response), JSON_PRETTY_PRINT);
    mysqli_close($result);
    
?>