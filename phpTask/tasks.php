<?php
// header('content-type:application/json;charset=utf8');
// header('Content-type:text/json');
header('Access-Control-Allow-Origin:http://127.0.0.1:5500');
header("Access-Control-Allow-Methods:GET");
include("./mysql.php");
date_default_timezone_set('PRC');
$conn->query("set names utf8");

$json = '';
$data = array();
class task {
    public $id;
    public $task;
    public $isComp;
}

$sql = "SELECT id,task,isComp FROM `tasks` ORDER BY `id`";
//按ID排序并查询商品

$result = $conn->query($sql);

if($result) {
    //echo "查询成功";
    while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
        $task = new task();
        $task->id = $row["id"];
        $task->task = $row["task"];
        $task->isComp = $row["isComp"];
        $data[]=$task;
    }
    //把数据转换为JSON数据.
    $json = json_encode($data,true);
    // echo "{".'"task"'.":".$json."}";
	echo $json;
} else {
    echo "查询失败";
}

// $row=array();
// while ($roww = mysqli_fetch_array($res,MYSQLI_ASSOC)){
// 	$count=count($roww);
// 	for ($i=0;$i<$count;$i++){
// 		unset($roww[$i]);
// 	}//这个地方需要不停的删除已经push到数组的项目，说实话，并没有搞懂，但没有这个语句，执行有问题
// 	array_push($row,$roww);
// }

// echo json_encode($row,true);

$conn->close();
?>