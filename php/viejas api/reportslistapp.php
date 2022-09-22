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
        $sql = "SELECT max(date) as last_messages, reports.*, pe_student.mail_s, pe_student.id_m, pe_student.photo_s, pe_student.name_s, pe_student.l_name_s, manager.id_m, manager.photo, DATE_FORMAT(max(date), '%Y.%m.%d') as year_messages, DATE_FORMAT(max(date), '%m') as months_messages, DATE_FORMAT(max(date), '%d') as days_messages, DATE_FORMAT(max(date), '%H:%i') as hours_messages, DATE_FORMAT(max(date), '%Y%m%d') as order_message FROM reports INNER JOIN users ON users.mail = '$userLogin' AND reports.mail_i = users.mail INNER JOIN pe_student ON reports.stu_rep = pe_student.mail_s INNER JOIN manager ON pe_student.id_m = manager.id_m GROUP BY id_not ORDER BY order_message DESC;";
        $query = $result->query($sql);
        while($data = $query->fetch(PDO::FETCH_ASSOC)){
            $response["reportslist"][$cont]["id_not"] = $data["id_not"];
            $response["reportslist"][$cont]["photo_s"] = $data["photo_s"];
            $response["reportslist"][$cont]["photo_m"] = $data["photo"];
            $response["reportslist"][$cont]["status"] = $data["status"];
            $response["reportslist"][$cont]["title"] = $data["title"];
            $response["reportslist"][$cont]["name_s"] = $data["name_s"];
            $response["reportslist"][$cont]["l_name_s"] = $data["l_name_s"];
            if($data["year_messages"] >= date('Y')) {
                if($data["year_messages"] == date('Y-m-d')) {
                    $response["reportslist"][$cont]["date"] = $data["hours_messages"];
                } else { 
                if($data["months_messages"] >= '01') {
                    $response["reportslist"][$cont]["date"] = "Jan ".$data["days_messages"];
                }
                if($data["months_messages"] >= '02') {
                    $response["reportslist"][$cont]["date"] = "Feb ".$data["days_messages"];
                }
                if($data["months_messages"] >= '03') {
                    $response["reportslist"][$cont]["date"] = "Mar ".$data["days_messages"];
                }
                if($data["months_messages"] >= '04') {
                    $response["reportslist"][$cont]["date"] = "Apr ".$data["days_messages"];
                }
                if($data["months_messages"] >= '05') {
                    $response["reportslist"][$cont]["date"] = "May ".$data["days_messages"];
                }
                if($data["months_messages"] >= '06') {
                    $response["reportslist"][$cont]["date"] = "Jun ".$data["days_messages"];
                }
                if($data["months_messages"] >= '07') {
                    $response["reportslist"][$cont]["date"] = "Jul ".$data["days_messages"];
                }
                if($data["months_messages"] >= '08') {
                    $response["reportslist"][$cont]["date"] = "Aug ".$data["days_messages"];
                }
                if($data["months_messages"] >= '09') {
                    $response["reportslist"][$cont]["date"] = "Sep ".$data["days_messages"];
                }
                if($data["months_messages"] >= '10') {
                    $response["reportslist"][$cont]["date"] = "Oct ".$data["days_messages"];
                }
                if($data["months_messages"] >= '11') {
                    $response["reportslist"][$cont]["date"] = "Nov ".$data["days_messages"];
                }
                if($data["months_messages"] >= '12') {
                    $response["reportslist"][$cont]["date"] = "Dec ".$data["days_messages"];
                }
                    
                }
                $response["reportslist"][$cont]["dateisbigger"] = "No";
            } else {
                $response["reportslist"][$cont]["date"] = $data["year_messages"];
                $response["reportslist"][$cont]["dateisbigger"] = "Yes";
            }
            $cont++;
        }
        $cont2 = 0;
        $sql2 = "SELECT events.email, events.mail_s, events.status, notification.* FROM events INNER JOIN notification ON events.email = '$userLogin' AND events.mail_s != 'NULL' AND events.mail_s = notification.user_i_mail AND events.email = notification.user_r";
        $query2 = $result->query($sql2);
            while($data = $query2->fetch(PDO::FETCH_ASSOC)){
                $response["studentslist"][$cont2]["user_i_mail"] = $data["user_i_mail"];
                $cont2++;
            }
        
}

echo json_encode(array($response), JSON_PRETTY_PRINT);
mysqli_close($result);
?>

