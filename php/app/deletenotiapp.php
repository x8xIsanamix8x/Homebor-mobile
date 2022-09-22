<?php

    require("connectapp.php");
    
    $result = connect();
    $response = array();
    
    $email = $_GET["email"];
    
    
    
        $sql = "UPDATE `notification` SET `state`='2' WHERE user_r='$email' AND title!='Reservation Request'";
        $query = $result->prepare($sql);
        $res = $query->execute();
    
            if($res){
                $response["status"] = 1;
            }else{
                $response["status"] = 0;
            }
    
    echo json_encode($response);
    mysqli_close($result);

?>