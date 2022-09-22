<?

    require("connectapp.php");
    require("../cript.php");


    $result = connect();
    $response = array();


    $email = $_GET["email"];
    $password = $_GET["password"];
    $passwordD = SED::encryption($password);


    $sql = $result->query("SELECT mail, psw, usert, status FROM users WHERE mail='$email' and psw='$passwordD' and usert = 'homestay' and status = 'Activate'");
    $query = $sql->fetch(PDO::FETCH_ASSOC);

    if($query){
        $response["status"] = 1;
    }else{
        $response["status"] = 0;
    }

    echo json_encode($response);
    mysqli_close($result);

?>