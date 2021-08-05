<?php

    require("connectapp.php");

    $userLogin = $_GET["email"];

    $img_path='./public/'.$userLogin.'/' . $_FILES['photo']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo']['tmp_name'],$img_path)){
        $sql="UPDATE pe_home SET phome = '$img_path'";
        $img_pathComplete='http://homebor.com/public'.$userLogin.'/'.$_FILES['photo']['name'];
        $query=$result->prepare($sql);
        $res=$query->execute([
            "imgpath" => $img_pathComplete,

        ]);
        if($res){
            $response["status"]=1;
        }
    };
    echo json_encode($response);

?>