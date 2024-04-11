<?php
include "./partials/connection.php";
try {

    $completed = ($_POST['completed'] == 'true')?1:0;
    $title=$_POST['Title'];
    $userId=$_POST['userId'];

    $SQL = "INSERT INTO `task` (`title`, `completed`, `idUser`) VALUES ('{$title}', {$completed}, {$userId});";
    $conn ->query($SQL);
    echo "created task";

} catch (PDOException $e) {
    die($e->getMessage());
}