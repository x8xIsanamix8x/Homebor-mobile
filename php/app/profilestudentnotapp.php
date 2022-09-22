<?php

    require("connectapp.php");
    
    $result = connect();
    $response = array();
    
    $userLogin = $_GET["idnoti"];
    
    $sql_d = "SELECT pe_student.*, notification.*, academy.*, pe_home.mail_h, pe_home.h_name, pe_home.name_h, pe_home.l_name_h, manager.id_m, manager.mail, manager.a_name, DATE_FORMAT(departure_f, '%Y-%m-%d') as formatted_date  FROM notification INNER JOIN pe_student ON notification.id_not = '$userLogin' AND notification.user_i_mail = pe_student.mail_s INNER JOIN academy ON pe_student.n_a = academy.id_ac INNER JOIN pe_home ON notification.user_r = pe_home.mail_h INNER JOIN manager ON pe_student.id_m = manager.id_m";
    $query_d = $result->query($sql_d);
    
    while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
        $response[] = $start; 
    }
    
    echo json_encode(array("data" => $response), JSON_PRETTY_PRINT);
    mysqli_close($result);
    
?>
