<?

    require("connectapp.php");
    
    $result = connect();
    $response = array();
    
    
    $email = $_GET["email"];
    
    date_default_timezone_set("America/Toronto");
    $date = date('Y-m-d H:i:s');
    
    $sql_d = "SELECT pe_home.mail_h, pe_home.id_home, pe_home.id_m FROM pe_home WHERE mail_h='$email'";
    $query_d = $result->query($sql_d);
            
        while($active = $query_d->fetch(PDO::FETCH_ASSOC)) {
            $sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m, reason) VALUES ('$email', 'Reactivate User', '$date', '$mail_h', '$active[id_m]', 'Reactivate From the App');
                    UPDATE users SET status = 'Activate' WHERE mail = '$email';
                    UPDATE pe_home SET status = 'Available' WHERE mail_h = '$email' AND id_home = '$active[id_home]';
                    UPDATE propertie_control SET status = 'Available' WHERE id_home = '$active[id_home]';";
    
            $query = $result->prepare($sql);
            $res = $query->execute();
    
            if($res){
                $response["status"] = 1;
            }else{
                $response["status"] = 0;
            }
    
        }
    
    echo json_encode($response);
    mysqli_close($result);

?>