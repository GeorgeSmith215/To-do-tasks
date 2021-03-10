<?php
header('Access-Control-Allow-Origin:http://127.0.0.1:5500');
header('content-type:application/json;charset=utf8');
header('Access-Control-Allow-Methods:POST,GET');

$taskItem = $_POST;
$addTask = $taskItem['task'];
if($addTask !=""){
    include("mysql.php");
    date_default_timezone_set('PRC');
    //设置编码方式（防止乱码）
    $conn->query("set names utf8");
    $sql = "INSERT INTO `tasks` (`task`) VALUES ('$addTask')";
    if ($conn->query($sql) === TRUE) {
        $sql = "SELECT id,task,isComp FROM `tasks` ORDER BY `id` DESC";
        $result = $conn->query($sql);
        $row = $result->fetch_array(MYSQLI_ASSOC);
        echo json_encode($row,true);
    } else {
    echo "Goods ADD FAILED,PLEASE contect Ultimate Admin!";
    echo "Error: " . $sql . "<br>" . $conn->error;
    }
    $conn->close();
}else echo "Task can not be empty!";

?>