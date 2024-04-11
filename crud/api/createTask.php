<?php
try{
   
    $title=$_POST["Title"];
    $userID=$_POST["uid"];
    $completed=($_POST["complete"==true]?1:0);

    include './partials/Connection.php';

    $sql='insert into task(title,idUser,completed) values(`{$title}`,`{$userID}`,`{$completed}`);';
    $conn->prepare($sql)->execute();
    echo 'created task';
}
catch(PDOException $e){
    die($e->getMessage());
}
