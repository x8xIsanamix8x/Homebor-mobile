<?

require("connectapp.php");
require("cript.php");


$result = connect();
$response = array();


$email = $_GET["email"];
$password = $_GET["password"];
$passwordD = SED::encryption($password);

$sql = $result->query("SELECT * FROM users WHERE mail='$email' and psw='$passwordD'");
$query = $sql->fetch(PDO::FETCH_ASSOC);

if($query){
    $response["status"] = 1;
}else{
    $response["status"] = 0;
}

echo json_encode($response);

?>c