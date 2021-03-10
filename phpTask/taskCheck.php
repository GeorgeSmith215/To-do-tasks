<?php
header('Access-Control-Allow-Origin:http://127.0.0.1:5500');
header('content-type:application/json;charset=utf8');
header('Access-Control-Allow-Methods:PUT');
date_default_timezone_set('PRC');

if ('PUT' === $_SERVER['REQUEST_METHOD']) {
    $taskID = $_SERVER['QUERY_STRING'];
    
    include("mysql.php");
    $conn->query("set names utf8");
    //设置编码方式（防止乱码）
    $sql = "SELECT * FROM `tasks` WHERE `id`='$taskID'";
    $result = $conn->query($sql);
    $row = $result->fetch_array(MYSQLI_ASSOC);

    if($row['isComp'] == 0){
        $isComp = 1;
    }else $isComp = 0;

    $sql = "UPDATE `tasks` SET `isComp` = $isComp WHERE `tasks`.`id` = $taskID";
    if ($conn->query($sql) === TRUE) {
        $row['isComp'] = $isComp;
        echo json_encode($row,true);
    } else {
        echo "Goods ADD FAILED,PLEASE contect Ultimate Admin!";
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    $conn->close();
}

?>