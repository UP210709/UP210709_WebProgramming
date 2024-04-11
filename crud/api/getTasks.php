<?php
include './partials/Connection.php';
try{
    $sql = "SELECT t.id as id, firstname,title,completed,u.id as uid from `task` t join `user` u on t.idUser = u.id;";
    $state = $conn->query($sql);
    $json = [];
    while($row = $state->fetch(PDO::FETCH_ASSOC)){
        array_push($json,[
            "id" => $row['id'],
            "user" => $row['firstname'],
            "title" =>  $row['title'],
            "completed" => $row["completed"],
            "userId" => $row["uid"]
        ]);
    }
    echo json_encode($json);
}catch(PDOException $e){
    die($e->getMessage());
}