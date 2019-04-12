<?php	
	header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-type");
   include('db.php');
	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	//print_r($request);exit;
	$type=!empty($request->type)? trim($request->type):'';
	switch ($type) {
		case "insert":
			$name=!empty($request->name)? trim($request->name):'';
			
			$status='Active';
			$createdOn=date('Y-m-d H:i:s');
			
				$sql = "INSERT INTO manufacturers (name) VALUES(?)";
				$result=$conn->prepare($sql)->execute([$name]);
				if(!empty($result)){
					$response=array('code'=>200,'message'=>'Success');	
				}else{
					$response=array('code'=>201,'message'=>'Sorry! Try again.');		
				}	
			echo json_encode($response);
		break;		
			
		
		case "listing":
		
		
		$sql="SELECT * FROM manufacturers ";
		$sql.='where 1 ';	
		
		$sql.=" ORDER BY id ASC";
		//echo $sql;exit;
		$getManufacturers = $conn->prepare($sql);
		$getManufacturers->execute();
		$manufacturers = $getManufacturers->fetchAll();
			if(!empty($manufacturers)){
						foreach($manufacturers as $key=>$val){
						$data[$key]=$val;
					}
					$response=array('code'=>200,'response'=>$data);			
			}else{
			$response=array('code'=>201,'message'=>'Data not found.');
			}

		echo json_encode($response);
		break;				
		default:
			echo "Your favorite color is neither red, blue, nor green!";
			
	}
?>
