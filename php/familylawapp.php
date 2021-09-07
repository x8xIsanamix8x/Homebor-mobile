<?php

require("connectapp.php");

$result = connect();
$response = array();

$id = $_GET["id"];
$email = $_GET["email"];
$lawf1 = $_GET["lawf1"];
$lawf2 = $_GET["lawf2"];
$lawf3 = $_GET["lawf3"];
$lawf4 = $_GET["lawf4"];
$lawf5 = $_GET["lawf5"];
$lawf6 = $_GET["lawf6"];
$lawf7 = $_GET["lawf7"];
$lawf8 = $_GET["lawf8"];

if($lawf1 == 'Yes'){
$lawf1_path='./public/'.$email.'/'.$_FILES['backfilef1']['name'];
$lawf1_path2='public/'.$email.'/'.$_FILES['backfilef1']['name']; 


    if(move_uploaded_file($_FILES['backfilef1']['tmp_name'],$lawf1_path)){
        $sql = "UPDATE mem_f SET lawf1='$lawf1_path2' WHERE id_home = '$id'";
        $lawf1_pathComplete='http://homebor.com/public/'.$email.'/'.$_FILES['backfilef1']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();
    
        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
}
}
if($lawf2 == 'Yes'){
$lawf2_path='./public/'.$email.'/'.$_FILES['backfilef2']['name'];
$lawf2_path2='public/'.$email.'/'.$_FILES['backfilef2']['name']; 


    if(move_uploaded_file($_FILES['backfilef2']['tmp_name'],$lawf2_path)){
        $sql = "UPDATE mem_f SET lawf2='$lawf2_path2' WHERE id_home = '$id'";
        $lawf2_pathComplete='http://homebor.com/public/'.$email.'/'.$_FILES['backfilef2']['name'];
        $query=$result->prepare($sql);
        $res = $query->execute();
    
        if($res){
            $response["status"] = 1;
        }else{
            $response["status"] = 0;
        }
}
}

if($lawf3 == 'Yes'){
    $lawf3_path='./public/'.$email.'/'.$_FILES['backfilef3']['name'];
    $lawf3_path2='public/'.$email.'/'.$_FILES['backfilef3']['name']; 
    
    
        if(move_uploaded_file($_FILES['backfilef3']['tmp_name'],$lawf3_path)){
            $sql = "UPDATE mem_f SET lawf3='$lawf3_path2' WHERE id_home = '$id'";
            $lawf3_pathComplete='http://homebor.com/public/'.$email.'/'.$_FILES['backfilef3']['name'];
            $query=$result->prepare($sql);
            $res = $query->execute();
        
            if($res){
                $response["status"] = 1;
            }else{
                $response["status"] = 0;
            }
    }
    }

    if($lawf4 == 'Yes'){
        $lawf4_path='./public/'.$email.'/'.$_FILES['backfilef4']['name'];
        $lawf4_path2='public/'.$email.'/'.$_FILES['backfilef4']['name']; 
        
        
            if(move_uploaded_file($_FILES['backfilef4']['tmp_name'],$lawf4_path)){
                $sql = "UPDATE mem_f SET lawf4='$lawf4_path2' WHERE id_home = '$id'";
                $lawf4_pathComplete='http://homebor.com/public/'.$email.'/'.$_FILES['backfilef4']['name'];
                $query=$result->prepare($sql);
                $res = $query->execute();
            
                if($res){
                    $response["status"] = 1;
                }else{
                    $response["status"] = 0;
                }
        }
        }

        if($lawf5 == 'Yes'){
            $lawf5_path='./public/'.$email.'/'.$_FILES['backfilef5']['name'];
            $lawf5_path2='public/'.$email.'/'.$_FILES['backfilef5']['name']; 
            
            
                if(move_uploaded_file($_FILES['backfilef5']['tmp_name'],$lawf5_path)){
                    $sql = "UPDATE mem_f SET lawf5='$lawf5_path2' WHERE id_home = '$id'";
                    $lawf5_pathComplete='http://homebor.com/public/'.$email.'/'.$_FILES['backfilef5']['name'];
                    $query=$result->prepare($sql);
                    $res = $query->execute();
                
                    if($res){
                        $response["status"] = 1;
                    }else{
                        $response["status"] = 0;
                    }
            }
            }
        
            if($lawf6 == 'Yes'){
                $lawf6_path='./public/'.$email.'/'.$_FILES['backfilef6']['name'];
                $lawf6_path2='public/'.$email.'/'.$_FILES['backfilef6']['name']; 
                
                
                    if(move_uploaded_file($_FILES['backfilef6']['tmp_name'],$lawf6_path)){
                        $sql = "UPDATE mem_f SET lawf6='$lawf6_path2' WHERE id_home = '$id'";
                        $lawf6_pathComplete='http://homebor.com/public/'.$email.'/'.$_FILES['backfilef6']['name'];
                        $query=$result->prepare($sql);
                        $res = $query->execute();
                    
                        if($res){
                            $response["status"] = 1;
                        }else{
                            $response["status"] = 0;
                        }
                }
                }

                if($lawf7 == 'Yes'){
                    $lawf7_path='./public/'.$email.'/'.$_FILES['backfilef7']['name'];
                    $lawf7_path2='public/'.$email.'/'.$_FILES['backfilef7']['name']; 
                    
                    
                        if(move_uploaded_file($_FILES['backfilef7']['tmp_name'],$lawf7_path)){
                            $sql = "UPDATE mem_f SET lawf7='$lawf7_path2' WHERE id_home = '$id'";
                            $lawf7_pathComplete='http://homebor.com/public/'.$email.'/'.$_FILES['backfilef7']['name'];
                            $query=$result->prepare($sql);
                            $res = $query->execute();
                        
                            if($res){
                                $response["status"] = 1;
                            }else{
                                $response["status"] = 0;
                            }
                    }
                    }

                    if($lawf8 == 'Yes'){
                        $lawf8_path='./public/'.$email.'/'.$_FILES['backfilef8']['name'];
                        $lawf8_path2='public/'.$email.'/'.$_FILES['backfilef8']['name']; 
                        
                        
                            if(move_uploaded_file($_FILES['backfilef8']['tmp_name'],$lawf8_path)){
                                $sql = "UPDATE mem_f SET lawf8='$lawf8_path2' WHERE id_home = '$id'";
                                $lawf8_pathComplete='http://homebor.com/public/'.$email.'/'.$_FILES['backfilef8']['name'];
                                $query=$result->prepare($sql);
                                $res = $query->execute();
                            
                                if($res){
                                    $response["status"] = 1;
                                }else{
                                    $response["status"] = 0;
                                }
                        }
                        }


echo json_encode($response);

?>