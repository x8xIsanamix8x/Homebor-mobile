<?php

    require("connectapp.php");
    $result = connect();
    $response = array();

    $email = $_GET["email"];

    $img_path='./public/'.$email.'/'.$_FILES['photo']['name'];
    $img_path2='public/'.$email.'/'.$_FILES['photo']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo']['tmp_name'],$img_path)){
        $sql="UPDATE pe_home SET phome = '$img_path2' WHERE mail_h = '$email'";
        $img_pathComplete='http://homebor.com/public/'.$email.'/'.$_FILES['photo']['name'];
        $query=$result->prepare($sql);
       $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
    echo json_encode($response);

?>