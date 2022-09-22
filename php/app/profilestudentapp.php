<?php

    require("connectapp.php");
    
    $result = connect();
    $response = array();
    
    $userLogin = $_GET["mail"];
    $email = $_GET["email"];
    
    $sql_d = "SELECT *, DATE_FORMAT(departure_f, '%Y-%m-%d') as formatted_date FROM pe_student INNER JOIN academy ON pe_student.mail_s = '$userLogin' AND pe_student.n_a = academy.id_ac INNER JOIN events ON pe_student.mail_s = events.mail_s AND events.email = '$email';";
    $query_d = $result->query($sql_d);
    
    while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
        $response[] = $start; 
    }
    
    echo json_encode(array("data" => $response), JSON_PRETTY_PRINT);
    mysqli_close($result);
    
?>

