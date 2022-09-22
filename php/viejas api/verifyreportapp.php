<?

require("connectapp.php");
require("cript.php");


$result = connect();
$response = array();


$email = $_GET["email"];
$mail = $_GET["mail"];

$sql = $result->query("SELECT * FROM reports WHERE mail_i='$email' AND stu_rep='$mail' AND status='Active'");
$query = $sql->fetch(PDO::FETCH_ASSOC);

if($query){
    $response["status"] = 1;
}else{
    $response["status"] = 0;
}

echo json_encode($response);
mysqli_close($result);
?>