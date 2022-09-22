<?php

    require("connectapp.php");
    
    $result = connect();
    $response = array();
    
    $id = $_GET["idnoti"];
    $email = $_GET["email"];
    $des = $_GET["des"];
    $name_h = $_GET["name_h"];
    $l_name_h = $_GET["l_name_h"];
    $a_name = $_GET["a_name"];
    $a_mail = $_GET["a_mail"];
    $stu_rep = $_GET["stu_rep"];
    $status = $_GET["status"];
    $imagereport = $_GET["imagereport"];
    $photo1 = $_GET["photo1"];
    
    date_default_timezone_set("America/Toronto");
    $date = date('Y-m-d H:i:s');
    
    $path='../public/'.$email.'/Reports/'.$id.'/';
    
    $names_i = $name_h.' '.$l_name_h;
    
        $sql2 = "SELECT * FROM reports WHERE id_not = '$id' LIMIT 1";
        $query2 = $result->query($sql2);
        $data = $query2->fetch(PDO::FETCH_ASSOC);
            $title = $data["title"];
    
    
        if($photo1 != 'yes'){
        
            $sql = "INSERT INTO reports (names_i, mail_i, names_r, mail_r, stu_rep, title, des, date, status, id_not, chatmail, report_img) VALUES ('$names_i', '$email', '$a_name', '$a_mail', '$stu_rep', '$title', '$des', '$date', '$status', '$id', '$email', 'NULL')";
            $query = $result->prepare($sql);
            $res = $query->execute();
            
            if($res){
                $response["status"] = 1;
            }else{
                $response["status"] = 0;
            }
        }else{
            if (file_exists($path)) {
            }else { mkdir('../public/'.$email.'/Reports/'.$id.'/', 0755);}
            
            $img_path='../public/'.$email.'/Reports/'.$id.'/'.$_FILES['photo']['name'];
            $img_path2='/public/'.$email.'/Reports/'.$id.'/'.$_FILES['photo']['name'];
            //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
            if(move_uploaded_file($_FILES['photo']['tmp_name'],$img_path)){
            $sql="INSERT INTO reports (names_i, mail_i, names_r, mail_r, stu_rep, title, des, date, status, id_not, chatmail, report_img) VALUES ('$names_i', '$email', '$a_name', '$a_mail', '$stu_rep', '$title', '$des', '$date', '$status', '$id', '$email', '$img_path2')";
            $img_pathComplete='http://homebor.com/public/'.$email.'/Reports/'.$id.'/'.$_FILES['photo']['name'];
            $query=$result->prepare($sql);
            $res = $query->execute();
    
            if($res){
                $response["status"] = 1;
            }else{
                $response["status"] = 0;
            }
        };
        
        }
        echo json_encode($response);
        mysqli_close($result);

?>

