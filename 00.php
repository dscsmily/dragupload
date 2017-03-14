<?php  
 
  
$filename = "upload/".time().substr($_FILES['upload']['name'], strrpos($_FILES['upload']['name'],'.'));  
$response = array();  
if(move_uploaded_file($_FILES['upload']['tmp_name'], $filename)){  
    $response['isSuccess'] = true;  
   
    $response['upload'] = $filename;  
}else{  
    $response['isSuccess'] = false;  
}  
echo json_encode($response);  
?>