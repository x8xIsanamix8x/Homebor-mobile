<?php

    require("connectapp.php");

    $result = connect();
    $response = array();
    
    $userLogin = $_GET["email"];
    
    $stmt = $result->query("SELECT * FROM `notification` WHERE user_r = '$userLogin' AND state = '0' AND confirmed = '0'");  
    $row_count = $stmt->rowCount();
    
        $response = $row_count; 
    
    echo json_encode(array("data" => $response), JSON_PRETTY_PRINT);
    mysqli_close($result);
    
?>