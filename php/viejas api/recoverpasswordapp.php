<?php 
include 'xeon.php';
error_reporting(0);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

include 'cript.php';



$usuario = $_GET['email'];

$query="SELECT * FROM users WHERE mail = '$usuario'";
$resultado=$link->query($query);

$row=$resultado->fetch_assoc();

$send = $row['id_user'];

$send_c = base64_encode($send);

	

    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->SMTPDebug = 0;                      // Enable verbose debug output
        $mail->isSMTP();                                            // Send using SMTP
        $mail->Host       = 'smtp.hostinger.com';                    // Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
        $mail->Username   = 'homebor@homebor.com';                     // SMTP username
        $mail->Password   = 'Homebor12345678';                               // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
        $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

        //Recipients
        $mail->setFrom('homebor@homebor.com', 'Homebor');
        $mail->addAddress($row['mail'], $row['name']);     // Add a recipient

        // Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = 'Password Recovery';
        $mail->Body    = 'Hello ' . $row['name'] . ', please <a href="http://homebor.com/change-pass.php?id_user='. $send_c .'"> log in here </a> to change your password';

        $mail->send();


        $response = "Sent";

        $json[] = array(

			'response' => $response
	
		);

		$jsonstring = json_encode($json);

		echo $jsonstring;

        /*header("location: login.php?fpass=true");*/
    } catch (Exception $e) {

        $response = "Fallo";

        $json[] = array(

			'response' => $response
	
		);

		$jsonstring = json_encode($json);

		echo $jsonstring;
        
        /*header("location: login.php?fpss=true");*/
    }

?>
