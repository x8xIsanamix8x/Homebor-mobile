<?php

    require("connectapp.php");
    $result = connect();
    $response = array();

    $email = $_GET["email"];
    $id = $_GET["id"];
    $idm = $_GET["idm"];
    $photo0 = $_GET["photo0"];
    $photo1 = $_GET["photo1"];
    $photo2 = $_GET["photo2"];
    $photo3 = $_GET["photo3"];
    $photo4 = $_GET["photo4"];
    $photo5 = $_GET["photo5"];
    $photo6 = $_GET["photo6"];
    $photo7 = $_GET["photo7"];
    $photo8 = $_GET["photo8"];
    $photo9 = $_GET["photo9"];
    $photo10 = $_GET["photo10"];
    $photo11 = $_GET["photo11"];

if($photo0 == 'Yes'){
    date_default_timezone_set("America/Toronto");
    $date = date('Y-m-d H:i:s');

    $sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Edit Homestay Photos', '$date', '$email', '$idm');";
    $query = $result->prepare($sql);
    $res = $query->execute();

    if($res){
        $response["status"] = 1;
    }else{
        $response["status"] = 0;
    }

}

if($photo1 == 'Yes') {
    $img_path='./public/'.$email.'/'.$_FILES['photo']['name'];
    $img_path2='public/'.$email.'/'.$_FILES['photo']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo']['tmp_name'],$img_path)){
        $sql="UPDATE pe_home, propertie_control SET pe_home.phome = '$img_path2', propertie_control.photo = '$img_path2' WHERE pe_home.id_home = '$id' AND propertie_control.id_home = '$id'";
        $img_pathComplete='http://homebor.com/public/'.$email.'/'.$_FILES['photo']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
}

if($photo2 == 'Yes') {
    $img2_path='./public/'.$email.'/'.$_FILES['photo2']['name'];
    $img2_path2='public/'.$email.'/'.$_FILES['photo2']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo2']['tmp_name'],$img2_path)){
        $sql="UPDATE photo_home SET pliving = '$img2_path2' WHERE id_home = '$id'";
        $img2_pathComplete='http://homebor.com/public/'.$email.'/'.$_FILES['photo2']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
}

if($photo3 == 'Yes') {
    $img3_path='./public/'.$email.'/'.$_FILES['photo3']['name'];
    $img3_path2='public/'.$email.'/'.$_FILES['photo3']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo3']['tmp_name'],$img3_path)){
        $sql="UPDATE photo_home SET fp = '$img3_path2' WHERE id_home = '$id'";
        $img3_pathComplete='http://homebor.com/public/'.$email.'/'.$_FILES['photo3']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
}

if($photo4 == 'Yes') {
    $img4_path='./public/'.$email.'/'.$_FILES['photo4']['name'];
    $img4_path2='public/'.$email.'/'.$_FILES['photo4']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo4']['tmp_name'],$img4_path)){
        $sql="UPDATE photo_home SET parea1 = '$img4_path2' WHERE id_home = '$id'";
        $img4_pathComplete='http://homebor.com/public/'.$email.'/'.$_FILES['photo4']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
}

if($photo5 == 'Yes') {
    $img5_path='./public/'.$email.'/'.$_FILES['photo5']['name'];
    $img5_path2='public/'.$email.'/'.$_FILES['photo5']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo5']['tmp_name'],$img5_path)){
        $sql="UPDATE photo_home SET parea2 = '$img5_path2' WHERE id_home = '$id'";
        $img5_pathComplete='http://homebor.com/public/'.$email.'/'.$_FILES['photo5']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
}

if($photo6 == 'Yes') {
    $img6_path='./public/'.$email.'/'.$_FILES['photo6']['name'];
    $img6_path2='public/'.$email.'/'.$_FILES['photo6']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo6']['tmp_name'],$img6_path)){
        $sql="UPDATE photo_home SET parea3 = '$img6_path2' WHERE id_home = '$id'";
        $img6_pathComplete='http://homebor.com/public/'.$email.'/'.$_FILES['photo6']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
}

if($photo7 == 'Yes') {
    $img7_path='./public/'.$email.'/'.$_FILES['photo7']['name'];
    $img7_path2='public/'.$email.'/'.$_FILES['photo7']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo7']['tmp_name'],$img7_path)){
        $sql="UPDATE photo_home SET parea4 = '$img7_path2' WHERE id_home = '$id'";
        $img7_pathComplete='http://homebor.com/public/'.$email.'/'.$_FILES['photo7']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
}

if($photo8 == 'Yes') {
    $img8_path='./public/'.$email.'/'.$_FILES['photo8']['name'];
    $img8_path2='public/'.$email.'/'.$_FILES['photo8']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo8']['tmp_name'],$img8_path)){
        $sql="UPDATE photo_home SET pbath1 = '$img8_path2' WHERE id_home = '$id'";
        $img8_pathComplete='http://homebor.com/public/'.$email.'/'.$_FILES['photo8']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
}

if($photo9 == 'Yes') {
    $img9_path='./public/'.$email.'/'.$_FILES['photo9']['name'];
    $img9_path2='public/'.$email.'/'.$_FILES['photo9']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo9']['tmp_name'],$img9_path)){
        $sql="UPDATE photo_home SET pbath2 = '$img9_path2' WHERE id_home = '$id'";
        $img9_pathComplete='http://homebor.com/public/'.$email.'/'.$_FILES['photo9']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
}

if($photo10 == 'Yes') {
    $img10_path='./public/'.$email.'/'.$_FILES['photo10']['name'];
    $img10_path2='public/'.$email.'/'.$_FILES['photo10']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo10']['tmp_name'],$img10_path)){
        $sql="UPDATE photo_home SET pbath3 = '$img10_path2' WHERE id_home = '$id'";
        $img10_pathComplete='http://homebor.com/public/'.$email.'/'.$_FILES['photo10']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
}

if($photo11 == 'Yes') {
    $img11_path='./public/'.$email.'/'.$_FILES['photo11']['name'];
    $img11_path2='public/'.$email.'/'.$_FILES['photo11']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo11']['tmp_name'],$img11_path)){
        $sql="UPDATE photo_home SET pbath4 = '$img11_path2' WHERE id_home = '$id'";
        $img11_pathComplete='http://homebor.com/public/'.$email.'/'.$_FILES['photo11']['name'];
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

?>