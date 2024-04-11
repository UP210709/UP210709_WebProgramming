<?php
include "./partials/connection.php";
try {
    $title=$_POST['Title'];
    $userId=$_POST['userId'];
    $id=$_POST['id'];
    $completed = ($_POST['completed'] == 'true')?1:0;
    $SQL = "UPDATE `task` SET title = '{$title}', completed = {$completed}, idUser = {$userId} WHERE id = {$id}";
    echo $SQL;
    $conn ->query($SQL);
    echo "updated task";

} catch (PDOException $e) {
    die($e->getMessage());
}