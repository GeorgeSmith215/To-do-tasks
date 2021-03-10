<?php
header('Access-Control-Allow-Origin:http://127.0.0.1:5500');
// header('content-type:text/plain;charset=utf8');
header('Access-Control-Allow-Methods:DELETE');

if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // 本次使用DELETE方法请求
    // 需要操作的数据都在URL中
    $taskID = $_SERVER['QUERY_STRING'];

    include("mysql.php");
    date_default_timezone_set('PRC');

    //设置编码方式（防止乱码）
    $conn->query("set names utf8");
    $sql = "SELECT * FROM `tasks` WHERE `id`='$taskID'";
    $result = $conn->query($sql);
    $row = $result->fetch_array(MYSQLI_ASSOC);
    $id=$row['id'];
    if($id)
    {
        $sql = "DELETE FROM `tasks` WHERE `id`='$taskID'";
        if ($conn->query($sql) === TRUE) {
            echo 'OK';
            // echo 'Congratulations,task DELETE successfully!';
        } else {
        echo "task DELETE FAILED,PLEASE contect Ultimate Admin!";
        echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
    else {
        echo "task DELETE FAILED,task is not exist!";
    }

    $conn->close();
}
    
?>