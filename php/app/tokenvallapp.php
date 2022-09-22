<?

    require("connectapp.php");
    require("../cript.php");
    
    
    $result = connect();
    $response = array();
    
    
    $email = $_GET["email"];
    $token = $_GET["token"];
    $tokenE = SED::encryption($token);
    
    $sql = $result->query("SELECT * FROM caraotapp WHERE email = '$email' AND appdir = '$tokenE'");
    $query = $sql->fetch(PDO::FETCH_ASSOC);
    
    if($query){
        $response["status"] = 1;
    }else{
        $response["status"] = 0;
    }

    echo json_encode($response);
    mysqli_close($result);
    
?>