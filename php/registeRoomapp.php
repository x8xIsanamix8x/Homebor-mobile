<?php

    require("connectapp.php");
    $result = connect();
    $response = array();

    $email = $_GET["email"];
    $id = $_GET["id"];
    $idm = $_GET["idm"];
    $photo0 = $_GET["photo0"];
    $photo1 = $_GET["photo1"];
    $photo1_2 = $_GET["photo1_2"];
    $photo1_3 = $_GET["photo1_3"];

    $photo2 = $_GET["photo2"];
    $photo2_2 = $_GET["photo2_2"];
    $photo2_3 = $_GET["photo2_3"];

    $photo3 = $_GET["photo3"];
    $photo3_2 = $_GET["photo3_2"];
    $photo3_3 = $_GET["photo3_3"];

    $photo4 = $_GET["photo4"];
    $photo4_2 = $_GET["photo4_2"];
    $photo4_3 = $_GET["photo4_3"];

    $photo5 = $_GET["photo5"];
    $photo5_2 = $_GET["photo5_2"];
    $photo5_3 = $_GET["photo5_3"];

    $photo6 = $_GET["photo6"];
    $photo6_2 = $_GET["photo6_2"];
    $photo6_3 = $_GET["photo6_3"];

    $photo7 = $_GET["photo7"];
    $photo7_2 = $_GET["photo7_2"];
    $photo7_3 = $_GET["photo7_3"];

    $photo8 = $_GET["photo8"];
    $photo8_2 = $_GET["photo8_2"];
    $photo8_3 = $_GET["photo8_3"];

    $type1 = $_GET["type1"];
    $bed1 = $_GET["bed1"];
    $food1 = $_GET["food1"];
    $bed1_2 = $_GET["bed1_2"];
    $bed1_3 = $_GET["bed1_3"];
    $aprox1 = addslashes($_GET["aprox1"]);

    $type2 = $_GET["type2"];
    $bed2 = $_GET["bed2"];
    $food2 = $_GET["food2"];
    $bed2_2 = $_GET["bed2_2"];
    $bed2_3 = $_GET["bed2_3"];
    $aprox2 = addslashes($_GET["aprox2"]);

    $type3 = $_GET["type3"];
    $bed3 = $_GET["bed3"];
    $food3 = $_GET["food3"];
    $bed3_2 = $_GET["bed3_2"];
    $bed3_3 = $_GET["bed3_3"];
    $aprox3 = addslashes($_GET["aprox3"]);

    $type4 = $_GET["type4"];
    $bed4 = $_GET["bed4"];
    $food4 = $_GET["food4"];
    $bed4_2 = $_GET["bed4_2"];
    $bed4_3 = $_GET["bed4_3"];
    $aprox4 = addslashes($_GET["aprox4"]);

    $type5 = $_GET["type5"];
    $bed5 = $_GET["bed5"];
    $food5 = $_GET["food5"];
    $bed5_2 = $_GET["bed5_2"];
    $bed5_3 = $_GET["bed5_3"];
    $aprox5 = addslashes($_GET["aprox5"]);

    $type6 = $_GET["type6"];
    $bed6 = $_GET["bed6"];
    $food6 = $_GET["food6"];
    $bed6_2 = $_GET["bed6_2"];
    $bed6_3 = $_GET["bed6_3"];
    $aprox6 = addslashes($_GET["aprox6"]);

    $type7 = $_GET["type7"];
    $bed7 = $_GET["bed7"];
    $food7 = $_GET["food7"];
    $bed7_2 = $_GET["bed7_2"];
    $bed7_3 = $_GET["bed7_3"];
    $aprox7 = addslashes($_GET["aprox7"]);

    $type8 = $_GET["type8"];
    $bed8 = $_GET["bed8"];
    $food8 = $_GET["food8"];
    $bed8_2 = $_GET["bed8_2"];
    $bed8_3 = $_GET["bed8_3"];
    $aprox8 = addslashes($_GET["aprox8"]);

    if($bed1 != 'NULL'){$date1 = 'Available'; } else { $date1 = 'NULL'; }
    if($bed1_2 != 'NULL'){$date1_2 = 'Available'; } else { $date1_2 = 'NULL'; }
    if($bed1_3 != 'NULL'){$date1_3 = 'Available'; } else { $date1_3 = 'NULL'; }

    if($bed2 != 'NULL'){$date2 = 'Available'; } else { $date2 = 'NULL'; }
    if($bed2_2 != 'NULL'){$date2_2 = 'Available'; } else { $date2_2 = 'NULL'; }
    if($bed2_3 != 'NULL'){$date2_3 = 'Available'; } else { $date2_3 = 'NULL'; }

    if($bed3 != 'NULL'){$date3 = 'Available'; } else { $date3 = 'NULL'; }
    if($bed3_2 != 'NULL'){$date3_2 = 'Available'; } else { $date3_2 = 'NULL'; }
    if($bed3_3 != 'NULL'){$date3_3 = 'Available'; } else { $date3_3 = 'NULL'; }

    if($bed4 != 'NULL'){$date4 = 'Available'; } else { $date4 = 'NULL'; }
    if($bed4_2 != 'NULL'){$date4_2 = 'Available'; } else { $date4_2 = 'NULL'; }
    if($bed4_3 != 'NULL'){$date4_3 = 'Available'; } else { $date4_3 = 'NULL'; }

    if($bed5 != 'NULL'){$date5 = 'Available'; } else { $date5 = 'NULL'; }
    if($bed5_2 != 'NULL'){$date5_2 = 'Available'; } else { $date5_2 = 'NULL'; }
    if($bed5_3 != 'NULL'){$date5_3 = 'Available'; } else { $date5_3 = 'NULL'; }

    if($bed6 != 'NULL'){$date6 = 'Available'; } else { $date6 = 'NULL'; }
    if($bed6_2 != 'NULL'){$date6_2 = 'Available'; } else { $date6_2 = 'NULL'; }
    if($bed6_3 != 'NULL'){$date6_3 = 'Available'; } else { $date6_3 = 'NULL'; }

    if($bed7 != 'NULL'){$date7 = 'Available'; } else { $date7 = 'NULL'; }
    if($bed7_2 != 'NULL'){$date7_2 = 'Available'; } else { $date7_2 = 'NULL'; }
    if($bed7_3 != 'NULL'){$date7_3 = 'Available'; } else { $date7_3 = 'NULL'; }

    if($bed8 != 'NULL'){$date8 = 'Available'; } else { $date8 = 'NULL'; }
    if($bed8_2 != 'NULL'){$date8_2 = 'Available'; } else { $date8_2 = 'NULL'; }
    if($bed8_3 != 'NULL'){$date8_3 = 'Available'; } else { $date8_3 = 'NULL'; }
    
    $hab = 0 ;

    if($type1 != 'NULL' ||  $bed1 != 'NULL' || $food1 != 'NULL' || $date1 != 'NULL' || $bed1_2 != 'NULL' || $date1_2 != 'NULL' || $bed1_3 != 'NULL' || $date1_3 != 'NULL' || $aprox1 != '0') {
        $hab = 1;
    }else{
     
    }
    
    if($type2 != 'NULL' ||  $bed2 != 'NULL' || $food2 != 'NULL' || $date2 != 'NULL' || $bed2_2 != 'NULL' || $date2_2 != 'NULL' || $bed2_3 != 'NULL' || $date2_3 != 'NULL' || $aprox2 != '0') {
        $hab = 2;
    }else{
     
    }
    
    if($type3 != 'NULL' ||  $bed3 != 'NULL' || $food3 != 'NULL' || $date3 != 'NULL' || $bed3_2 != 'NULL' || $date3_2 != 'NULL' || $bed3_3 != 'NULL' || $date3_3 != 'NULL' || $aprox3 != '0') {
        $hab = 3;
    }else{
     
    }
    
    if($type4 != 'NULL' ||  $bed4 != 'NULL' || $food4 != 'NULL' || $date4 != 'NULL' || $bed4_2 != 'NULL' || $date4_2 != 'NULL' || $bed4_3 != 'NULL' || $date4_3 != 'NULL' || $aprox4 != '0') {
        $hab = 4;
    }else{
      
    }
    
    if($type5 != 'NULL' ||  $bed5 != 'NULL' || $food5 != 'NULL' || $date5 != 'NULL' || $bed5_2 != 'NULL' || $date5_2 != 'NULL' || $bed5_3 != 'NULL' || $date5_3 != 'NULL' || $aprox5 != '0') {
        $hab = 5;
    }else{
     
    }
    
    if($type6 != 'NULL' ||  $bed6 != 'NULL' || $food6 != 'NULL' || $date6 != 'NULL' || $bed6_2 != 'NULL' || $date6_2 != 'NULL' || $bed6_3 != 'NULL' || $date6_3 != 'NULL' || $aprox6 != '0') {
        $hab = 6;
    }else{
     
    }
    
    if($type7 != 'NULL' ||  $bed7 != 'NULL' || $food7 != 'NULL' || $date7 != 'NULL' || $bed7_2 != 'NULL' || $date7_2 != 'NULL' || $bed7_3 != 'NULL' || $date7_3 != 'NULL' || $aprox7 != '0') {
        $hab = 7;
    }else{
     
    }
    
    if($type8 != 'NULL' ||  $bed8 != 'NULL' || $food8 != 'NULL' || $date8 != 'NULL' || $bed8_2 != 'NULL' || $date8_2 != 'NULL' || $bed8_3 != 'NULL' || $date8_3 != 'NULL' || $aprox8 != '0') {
        $hab = 8;
    }else{
     
    }

    

if($photo0 == 'Yes'){
    date_default_timezone_set("America/Toronto");
    $date = date('Y-m-d H:i:s');

    $sql = "INSERT INTO webmaster (user, activity, dates, edit_user, id_m) VALUES ('$email', 'Edit Rooms Information', '$date', '$email', '$idm');
    UPDATE room SET type1='$type1', bed1='$bed1', bed1_2='$bed1_2', bed1_3='$bed1_3', food1='$food1', date1='$date1', date1_2='$date1_2', date1_3='$date1_3', aprox1='$aprox1', type2='$type2', bed2='$bed2', bed2_2='$bed2_2', bed2_3='$bed2_3', food2='$food2', date2='$date2', date2_2='$date2_2', date2_3='$date2_3', aprox2='$aprox2', type3='$type3', bed3='$bed3', bed3_2='$bed3_2', bed3_3='$bed3_3', food3='$food3', date3='$date3', date3_2='$date3_2', date3_3='$date3_3', aprox3='$aprox3', type4='$type4', bed4='$bed4', bed4_2='$bed4_2', bed4_3='$bed4_3', food4='$food4', date4='$date4', date4_2='$date4_2', date4_3='$date4_3', aprox4='$aprox4', type5='$type5', bed5='$bed5', bed5_2='$bed5_2', bed5_3='$bed5_3', food5='$food5', date5='$date5', date5_2='$date5_2', date5_3='$date5_3', aprox5='$aprox5', type6='$type6', bed6='$bed6', bed6_2='$bed6_2', bed6_3='$bed6_3', food6='$food6', date6='$date6', date6_2='$date6_2', date6_3='$date6_3', aprox6='$aprox6', type7='$type7', bed7='$bed7', bed7_2='$bed7_2', bed7_3='$bed7_3', food7='$food7', date7='$date7', date7_2='$date7_2', date7_3='$date7_3', aprox7='$aprox7', type8='$type8', bed8='$bed8', bed8_2='$bed8_2', bed8_3='$bed8_3', food8='$food8', date8='$date8', date8_2='$date8_2', date8_3='$date8_3', aprox8='$aprox8' WHERE id_home = '$id';
    UPDATE pe_home SET room='$hab' WHERE id_home = '$id';
    UPDATE propertie_control SET room='$hab' WHERE id_home = '$id';";
    $query = $result->prepare($sql);
    $res = $query->execute();

    if($res){
        $response["status"] = 1;
    }else{
        $response["status"] = 0;
    }

}

if($photo1 == 'Yes') {
    $img_path='./public/'.$email.'/'.$_FILES['photo1']['name'];
    $img_path2='public/'.$email.'/'.$_FILES['photo1']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo1']['tmp_name'],$img_path)){
       $sql="UPDATE photo_home SET proom1 = '$img_path2' WHERE id_home = '$id'";
        $img2_pathComplete='https://www.homebor.com/public/'.$email.'/'.$_FILES['photo1']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
}

if($photo1_2 == 'Yes') {
    $img1_2_path='./public/'.$email.'/'.$_FILES['photo1_2']['name'];
    $img1_2_path2='public/'.$email.'/'.$_FILES['photo1_2']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo1_2']['tmp_name'],$img1_2_path)){
        $sql="UPDATE photo_home SET proom1_2 = '$img1_2_path2' WHERE id_home = '$id'";
        $img_pathComplete='https://www.homebor.com/public/'.$email.'/'.$_FILES['photo1_2']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
}

if($photo1_3 == 'Yes') {
    $img1_3_path='./public/'.$email.'/'.$_FILES['photo1_3']['name'];
    $img1_3_path2='public/'.$email.'/'.$_FILES['photo1_3']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo1_3']['tmp_name'],$img1_3_path)){
        $sql="UPDATE photo_home SET proom1_3 = '$img1_3_path2' WHERE id_home = '$id'";
        $img_pathComplete='https://www.homebor.com/public/'.$email.'/'.$_FILES['photo1_3']['name'];
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
        $sql="UPDATE photo_home SET proom2 = '$img2_path2' WHERE id_home = '$id'";
        $img_pathComplete='https://www.homebor.com/public/'.$email.'/'.$_FILES['photo2']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
}

if($photo2_2 == 'Yes') {
    $img2_2_path='./public/'.$email.'/'.$_FILES['photo2_2']['name'];
    $img2_2_path2='public/'.$email.'/'.$_FILES['photo2_2']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo2_2']['tmp_name'],$img2_2_path)){
        $sql="UPDATE photo_home SET proom2_2 = '$img2_2_path2' WHERE id_home = '$id'";
        $img_pathComplete='https://www.homebor.com/public/'.$email.'/'.$_FILES['photo2_2']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
}

if($photo2_3 == 'Yes') {
    $img2_3_path='./public/'.$email.'/'.$_FILES['photo2_3']['name'];
    $img2_3_path2='public/'.$email.'/'.$_FILES['photo2_3']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo2_3']['tmp_name'],$img2_3_path)){
        $sql="UPDATE photo_home SET proom2_3 = '$img2_3_path2' WHERE id_home = '$id'";
        $img_pathComplete='https://www.homebor.com/public/'.$email.'/'.$_FILES['photo2_3']['name'];
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
        $sql="UPDATE photo_home SET proom3 = '$img3_path2' WHERE id_home = '$id'";
        $img_pathComplete='https://www.homebor.com/public/'.$email.'/'.$_FILES['photo3']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
}

if($photo3_2 == 'Yes') {
    $img3_2_path='./public/'.$email.'/'.$_FILES['photo3_2']['name'];
    $img3_2_path2='public/'.$email.'/'.$_FILES['photo3_2']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo3_2']['tmp_name'],$img3_2_path)){
        $sql="UPDATE photo_home SET proom3_2 = '$img3_2_path2' WHERE id_home = '$id'";
        $img_pathComplete='https://www.homebor.com/public/'.$email.'/'.$_FILES['photo3_2']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
}

if($photo3_3 == 'Yes') {
    $img3_3_path='./public/'.$email.'/'.$_FILES['photo3_3']['name'];
    $img3_3_path2='public/'.$email.'/'.$_FILES['photo3_3']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo3_3']['tmp_name'],$img3_3_path)){
        $sql="UPDATE photo_home SET proom3_3 = '$img3_3_path2' WHERE id_home = '$id'";
        $img_pathComplete='https://www.homebor.com/public/'.$email.'/'.$_FILES['photo3_3']['name'];
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
        $sql="UPDATE photo_home SET proom4 = '$img4_path2' WHERE id_home = '$id'";
        $img_pathComplete='https://www.homebor.com/public/'.$email.'/'.$_FILES['photo4']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
}

if($photo4_2 == 'Yes') {
    $img4_2_path='./public/'.$email.'/'.$_FILES['photo4_2']['name'];
    $img4_2_path2='public/'.$email.'/'.$_FILES['photo4_2']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo4_2']['tmp_name'],$img4_2_path)){
        $sql="UPDATE photo_home SET proom4_2 = '$img4_2_path2' WHERE id_home = '$id'";
        $img_pathComplete='https://www.homebor.com/public/'.$email.'/'.$_FILES['photo4_2']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
}

if($photo4_3 == 'Yes') {
    $img4_3_path='./public/'.$email.'/'.$_FILES['photo4_3']['name'];
    $img4_3_path2='public/'.$email.'/'.$_FILES['photo4_3']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo4_3']['tmp_name'],$img4_3_path)){
        $sql="UPDATE photo_home SET proom4_3 = '$img4_3_path2' WHERE id_home = '$id'";
        $img_pathComplete='https://www.homebor.com/public/'.$email.'/'.$_FILES['photo4_3']['name'];
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
        $sql="UPDATE photo_home SET proom5 = '$img5_path2' WHERE id_home = '$id'";
        $img_pathComplete='https://www.homebor.com/public/'.$email.'/'.$_FILES['photo5']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
}

if($photo5_2 == 'Yes') {
    $img5_2_path='./public/'.$email.'/'.$_FILES['photo5_2']['name'];
    $img5_2_path2='public/'.$email.'/'.$_FILES['photo5_2']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo5_2']['tmp_name'],$img5_2_path)){
        $sql="UPDATE photo_home SET proom5_2 = '$img5_2_path2' WHERE id_home = '$id'";
        $img_pathComplete='https://www.homebor.com/public/'.$email.'/'.$_FILES['photo5_2']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
}

if($photo5_3 == 'Yes') {
    $img5_3_path='./public/'.$email.'/'.$_FILES['photo5_3']['name'];
    $img5_3_path2='public/'.$email.'/'.$_FILES['photo5_3']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo5_3']['tmp_name'],$img5_3_path)){
        $sql="UPDATE photo_home SET proom5_3 = '$img5_3_path2' WHERE id_home = '$id'";
        $img_pathComplete='https://www.homebor.com/public/'.$email.'/'.$_FILES['photo5_3']['name'];
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
        $sql="UPDATE photo_home SET proom6 = '$img6_path2' WHERE id_home = '$id'";
        $img_pathComplete='https://www.homebor.com/public/'.$email.'/'.$_FILES['photo6']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
}

if($photo6_2 == 'Yes') {
    $img6_2_path='./public/'.$email.'/'.$_FILES['photo6_2']['name'];
    $img6_2_path2='public/'.$email.'/'.$_FILES['photo6_2']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo6_2']['tmp_name'],$img6_2_path)){
        $sql="UPDATE photo_home SET proom6_2 = '$img6_2_path2' WHERE id_home = '$id'";
        $img_pathComplete='https://www.homebor.com/public/'.$email.'/'.$_FILES['photo6_2']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
}

if($photo6_3 == 'Yes') {
    $img6_3_path='./public/'.$email.'/'.$_FILES['photo6_3']['name'];
    $img6_3_path2='public/'.$email.'/'.$_FILES['photo6_3']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo6_3']['tmp_name'],$img6_3_path)){
        $sql="UPDATE photo_home SET proom6_3 = '$img6_3_path2' WHERE id_home = '$id'";
        $img_pathComplete='https://www.homebor.com/public/'.$email.'/'.$_FILES['photo6_3']['name'];
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
        $sql="UPDATE photo_home SET proom7 = '$img7_path2' WHERE id_home = '$id'";
        $img_pathComplete='https://www.homebor.com/public/'.$email.'/'.$_FILES['photo7']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
}

if($photo7_2 == 'Yes') {
    $img7_2_path='./public/'.$email.'/'.$_FILES['photo7_2']['name'];
    $img7_2_path2='public/'.$email.'/'.$_FILES['photo7_2']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo7_2']['tmp_name'],$img7_2_path)){
        $sql="UPDATE photo_home SET proom7_2 = '$img7_2_path2' WHERE id_home = '$id'";
        $img_pathComplete='https://www.homebor.com/public/'.$email.'/'.$_FILES['photo7_2']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
}

if($photo7_3 == 'Yes') {
    $img7_3_path='./public/'.$email.'/'.$_FILES['photo7_3']['name'];
    $img7_3_path2='public/'.$email.'/'.$_FILES['photo7_3']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo7_3']['tmp_name'],$img7_3_path)){
        $sql="UPDATE photo_home SET proom7_3 = '$img7_3_path2' WHERE id_home = '$id'";
        $img_pathComplete='https://www.homebor.com/public/'.$email.'/'.$_FILES['photo7_3']['name'];
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
        $sql="UPDATE photo_home SET proom8 = '$img8_path2' WHERE id_home = '$id'";
        $img_pathComplete='https://www.homebor.com/public/'.$email.'/'.$_FILES['photo8']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
}

if($photo8_2 == 'Yes') {
    $img8_2_path='./public/'.$email.'/'.$_FILES['photo8_2']['name'];
    $img8_2_path2='public/'.$email.'/'.$_FILES['photo8_2']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo8_2']['tmp_name'],$img8_2_path)){
        $sql="UPDATE photo_home SET proom8_2 = '$img8_2_path2' WHERE id_home = '$id'";
        $img_pathComplete='https://www.homebor.com/public/'.$email.'/'.$_FILES['photo8_2']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();

        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
    };
}

if($photo8_3 == 'Yes') {
    $img8_3_path='./public/'.$email.'/'.$_FILES['photo8_3']['name'];
    $img8_3_path2='public/'.$email.'/'.$_FILES['photo8_3']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo8_3']['tmp_name'],$img8_3_path)){
        $sql="UPDATE photo_home SET proom8_3 = '$img8_3_path2' WHERE id_home = '$id'";
        $img_pathComplete='https://www.homebor.com/public/'.$email.'/'.$_FILES['photo8_3']['name'];
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