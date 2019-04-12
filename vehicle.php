<?php	
	header('Access-Control-Allow-Origin: *'); 
	header('Access-Control-Allow-Headers: Content-Type'); 
    include('db.php');
 	define('UPLOAD_DIR', 'upload/');


  	function getBytesFromHexString($hexdata) {
        for ($count = 0; $count < strlen($hexdata); $count += 2)
            $bytes[] = chr(hexdec(substr($hexdata, $count, 2)));

        return implode($bytes);
    }

    function getImageMimeType($imagedata) {
        $imagemimetypes = array(
            "jpeg" => "FFD8",
            "png" => "89504E470D0A1A0A",
            "gif" => "474946",
            "bmp" => "424D",
            "tiff" => "4949",
            "tiff" => "4D4D"
        );

        foreach ($imagemimetypes as $mime => $hexbytes) {
            $bytes = getBytesFromHexString($hexbytes);
            if (substr($imagedata, 0, strlen($bytes)) == $bytes)
                return $mime;
        }

        return NULL;
    }
	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	
	$type=!empty($request->type)? trim($request->type):'';
	switch ($type) {
		case "insert":
			$name=!empty($request->name)? trim($request->name):'';
			$link=str_replace(" ","-",$name);
			$model=!empty($request->model)? trim($request->model):'';
			$manufacturerId=!empty($request->manufacturer_id)? trim($request->manufacturer_id):'';
			$color=!empty($request->color)? trim($request->color):'';
			$year=!empty($request->year)? trim($request->year):'';
			$registrationNumber=!empty($request->registration_number)? trim($request->registration_number):'';
			$files=!empty($request->url)? $request->url:array();
			if(empty($files)){
				$response=array('code'=>201,'message'=>'Atleast one images have to upload!.');
				echo json_encode($response);
			exit;
			}
			if(count($files)>0){
				$response=array('code'=>201,'message'=>'Only 2 images can upload!');
				echo json_encode($response);
			exit;
			}
			$note=!empty($request->note)? trim($request->note):'';			
			
				$sql = "INSERT INTO vehicles (name,link,model,manufacturer_id,color,year,registration_number,note) VALUES(?, ?, ?,?,?, ?, ?,?)";
				$result=$conn->prepare($sql)->execute([$name,$link,$model,$manufacturerId,$color,$year,$registrationNumber,$note]);
				$id = $conn->lastInsertId();
				if(!empty($result)){
					
					if(!empty($files)){
						foreach($files as $file){							
								$image_parts = explode(";base64,", $file);
								$image_type_aux = explode("image/", $image_parts[0]);
								$image_type = $image_type_aux[1];
								$image_base64 = base64_decode($image_parts[1]);
								$getExt = getImageMimeType($image_base64);
							    $extension = !empty($getExt) ? $getExt : 'jpg';
							    $file_name=time() . '.'.$extension;
								$file = UPLOAD_DIR . $file_name;
								$uploadStatus=file_put_contents($file, $image_base64);							
								if(!empty($uploadStatus)){
									$sqlImage = "INSERT INTO vehicle_images(name,vehicle_id) VALUES(?, ?)";
									$conn->prepare($sqlImage)->execute([$file_name,$id]);
								}
						}
					}	
					
					$response=array('code'=>200,'message'=>'Success');	
				}else{
					$response=array('code'=>201,'message'=>'Sorry! Try again.');		
				}
			echo json_encode($response);
			exit;
		break;
			
		case "list":
		$data=array();			
		$filter=!empty($request->filter)? trim($request->filter):'';
		$sortOrder=!empty($request->sortOrder)? trim($request->sortOrder):'asc';
		$sortColumn=!empty($request->sortColumn)? trim($request->sortColumn):'asc';
		$pageNumber=!empty($request->pageNumber)?trim($request->pageNumber):0;	
		$pageSize=!empty($request->pageSize)?trim($request->pageSize):10;	
			
		$sqlCount="SELECT  count(vehicles.model) as 'totalCount' FROM vehicles 
			INNER JOIN manufacturers on vehicles.manufacturer_id=manufacturers.id ";
			$sqlCount.='where 1';	
			if(!empty($filter)){
				$sqlCount.=" and manufacturers.name  LIKE  '%".$filter."%' or vehicles.model  LIKE  '%".$filter."%' ";
			}
			$sqlCount.="  GROUP BY manufacturers.name,vehicles.model ";
		
		$getContentCount = $conn->prepare($sqlCount);
		$getContentCount->execute();
		$contentCount = $getContentCount->fetchAll();		
		if(!empty($contentCount)){
			$totalCount=count($contentCount);
		}else{
			$totalCount=0;
		}
		$sql="SELECT vehicles.manufacturer_id, manufacturers.name,vehicles.model, count(vehicles.model) as 'total' FROM vehicles 
			INNER JOIN manufacturers on vehicles.manufacturer_id=manufacturers.id ";
		$sql.='where 1 ';	
		if(!empty($filter)){
			$sql.=" and manufacturers.name  LIKE  '%".$filter."%' or vehicles.model  LIKE  '%".$filter."%' ";
		}	
		$sql.="  GROUP BY vehicles.manufacturer_id, manufacturers.name,vehicles.model ";	
		if(!empty($sortColumn)){
			$sql.=' ORDER BY '.$sortColumn.' '.$sortOrder;
		}else{
			$sql.=" ORDER BY manufacturers.name ASC";
		}
		if(!empty($pageNumber)){
			$sql.=' limit '.$pageNumber.', '.$pageSize.' ';
		}else{
			$sql.=' limit 0, '.$pageSize.' ';
		}		
		$getContent = $conn->prepare($sql);
		$getContent->execute();
		$content = $getContent->fetchAll();
			$i=1;
		foreach($content as $val){
			$vehicle_details_list=array();
			$manufacturerId=!empty($val['manufacturer_id'])?$val['manufacturer_id']:0;
			$model=!empty($val['model'])?$val['model']:'';
			$sqlVehicle="select * from vehicles where manufacturer_id=".$manufacturerId." and model='".$model."'";			
			$getVehicle = $conn->prepare($sqlVehicle);
			$getVehicle->execute();
			$vehicleDetails = $getVehicle->fetchAll();
			if(!empty($vehicleDetails)){
				foreach($vehicleDetails as $vehicle){
					$vehicle_details_list[]=array(
						'name'=>!empty($vehicle['name'])?$vehicle['name']:'',
						'color'=>!empty($vehicle['color'])?$vehicle['color']:'',
						'year'=>!empty($vehicle['year'])?$vehicle['year']:'',
						'registration_number'=>!empty($vehicle['registration_number'])?$vehicle['registration_number']:'',
						'note'=>!empty($vehicle['note'])?$vehicle['note']:'',
					);
				}
			}
			$data[]=array('serial_number'=>$i,	
						 'name'=>!empty($val['name'])?$val['name']:'',
						 'manufacturer_id'=>$manufacturerId,
						 'model'=>$model,
						 'total'=>!empty($val['total'])?$val['total']:'',
						 'vehicle_details'=>$vehicle_details_list);
			$i++;
		}
		$response=array('result'=>$data,'totalCount'=>$totalCount);	
		echo json_encode($response);
		break;			
		
		case "delete":
			$manufacturerId=!empty($request->manufacturer_id)? trim($request->manufacturer_id):'';
			$model=!empty($request->model)? trim($request->model):'';
			$sql="select * from vehicles where manufacturer_id=".$manufacturerId." and model='".$model."'";			
			$getContent = $conn->prepare($sql);
			$getContent->execute();
			$content = $getContent->fetch();
			if(!empty($content)){				
				$sql = "DELETE FROM vehicles WHERE manufacturer_id=".$manufacturerId." and model='".$model."'";
				$result=$conn->prepare($sql)->execute();
				if(!empty($result)){
					$response=array('code'=>200,'message'=>'Success Deleted');	
				}else{
					$response=array('code'=>201,'message'=>'Sorry! Try again.');		
				}	
				
			} else{
				$response=array('code'=>201,'message'=>'Invalid operation.');	
			}
			
			echo json_encode($response);
		break;	
		case "get":
			$id=!empty($request->id)? trim($request->id):'';
			$sql="select * from vehicles where id=".$id."";
			$getContent = $conn->prepare($sql);
			$getContent->execute();
			$content = $getContent->fetch();
			if(!empty($content)){	
				if(!empty($content)){
					$response=array('code'=>200,'data'=>$content);	
				}else{
					$response=array('code'=>201,'message'=>'Sorry! Try again.');		
				}
			} else{
				$response=array('code'=>201,'message'=>'Invalid content id.');	
			}
			
			echo json_encode($response);
		break;		
		default:
			echo "Your favorite color is neither red, blue, nor green!";
			
	}
?>
