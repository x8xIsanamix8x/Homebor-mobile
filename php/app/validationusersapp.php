<?

    require("connectapp.php");
    
    
    $result = connect();
    $response = array();
    
    
    $email = $_GET["email"];
    
    $sql = $result->query("SELECT mail FROM users WHERE mail='$email'");
    $query = $sql->fetch(PDO::FETCH_ASSOC);
    
    if($query){
        $response["status"] = 1;
    }else{
        $response["status"] = 0;
    }
    
    echo json_encode($response);
    mysqli_close($result);
?>