<?php

    require("connectapp.php");
    require("cript.php");
    $img_path='./photos/' . $_FILES['photo']['name'];
    //move_uploaded_files($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name'])
    if(move_uploaded_file($_FILES['photo']['tmp_name'],$img_path)){
        $sql="INSERT INTO imagenes(imgruta) VALUES (:imgpath)";
        $img_pathComplete='https://caeptudea.com.co/pruebas_fotos/photos/'.$_FILES['photo']['name'];
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