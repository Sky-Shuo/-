<?php 
	header("Content-type:text/html;charset=utf-8");
	
	$responseData = array("code" => 0, "message" => "");

	$username = $_POST['username'];
	$password = $_POST['password'];
	
	if(!$username){
		$responseData['code'] = 1;
		$responseData['message'] = "请输入正确的手机号";
		echo json_encode($responseData);
		exit;
	
	}
	if(!$password){
		$responseData['code'] = 2;
		$responseData['message'] = "密码不能为空";
		echo json_encode($responseData);
		exit;
	}


	$link = mysql_connect("localhost", "root", "123456");

	if(!$link){
		echo "数据库连接失败";
		exit;
	}

	mysql_set_charset("utf8");

	mysql_select_db("qd19092");

	$str = md5(md5(md5($password).'qiangfeng').'qingdao');


	
	$sql = "SELECT * FROM users WHERE username='{$username}' AND password='{$str}'";
	
	$res = mysql_query($sql);
	
	$row = mysql_fetch_assoc($res);

	if(!$row){
		$responseData['code'] = 3;
		$responseData['message'] = "用户名或密码错误";
		echo json_encode($responseData);
		exit;
	}else{
		$responseData['message'] = "登录成功";
		echo json_encode($responseData);
	}


	mysql_close($link);
 ?>