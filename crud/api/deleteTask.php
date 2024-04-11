<?php
include "./partials/connection.php";
try {
    $taskId=$_POST['id'];

    $SQL = "DELETE FROM task WHERE id = {$taskId};";
    $state = $conn ->query($SQL);
    echo "task deleted";

} catch (PDOException $e) {
    die($e->getMessage());
}
