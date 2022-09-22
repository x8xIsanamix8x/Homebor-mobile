<?
    require("connectapp.php");
    
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
        
    require 'phpmailer/Exception.php';
    require 'phpmailer/PHPMailer.php';
    require 'phpmailer/SMTP.php';
    
    $result = connect();
    $response = array();
    
    
    $usuario = $_GET['email'];
    
    $sql = $result->query("SELECT mail FROM users WHERE mail='$usuario'");
    $query = $sql->fetch(PDO::FETCH_ASSOC);
    
    
    if($query){
        $response["status"] = 1;
        
        $sql_d = "SELECT id_user, mail, name FROM users WHERE mail='$usuario'";
        $query_d = $result->query($sql_d);
            
        while($start = $query_d->fetch(PDO::FETCH_ASSOC)) {
            $send = $start['id_user'];
    
            $send_c = base64_encode($send);
            
            $to      = $start['mail'];
            $subject = 'Password Recovery';
            $message = 'Hello ' . $start['name'] . ', please "http://homebor.com/change-pass.php?id_user='. $send_c .'" log in here to change your password';
            $headers = 'From: homebor@homebor.com' . "\r\n" .
                'Reply-To: homebor@homebor.com' . "\r\n" .
                'X-Mailer: PHP/' . phpversion();
        
            mail($to, $subject, $message, $headers);
            
        }
        
        
        
    }else{
        $response["status"] = 0;
    }
        
        
    
    echo json_encode($response);
    mysqli_close($result);
?>