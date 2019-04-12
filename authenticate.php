<?php 
	header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-type");
	include('db.php');
    session_start ();
	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	
	$username=$request->username;
	$password=$request->password;
	
    if(empty($username)){
		$response=array('code'=>201,'error'=>'User should not be empty');
		echo json_encode($response);
		exit;
	} else if(empty($password)){ 
		$response=array('code'=>201,'error'=>'Password should not be empty');
		echo json_encode($response);
		exit;
	}else{ 	
		$password= md5($password);
		
		try{			
			$stmt = $conn->prepare("SELECT * FROM users WHERE email=:usernameEmail AND password=:password"); 
			$stmt->bindParam("usernameEmail", $username,PDO::PARAM_STR) ;
			$stmt->bindParam("password", $password,PDO::PARAM_STR) ;
			$stmt->execute();
			$count=$stmt->rowCount();
			$data=$stmt->fetch(PDO::FETCH_OBJ);
			$db = null;
			if($count)
			{
				$response=array('code'=>200,'response'=>$data);
				echo json_encode($response);
				exit;
			}
			else{
				$data=array("code"=>201,"message"=>"Invalid User/email & password!");
				echo json_encode($data);
				exit;
			} 
			}
			catch(PDOException $e) {
				$data=array("code"=>201,"message"=>$e->getMessage());
				echo json_encode($data);
				exit;
			}  
	}
?>
