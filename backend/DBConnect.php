<?php

    include_once './config/DatabaseConfig.php';
    
    function dbConnect() {
        // Instantiate DB & connect
        $database = new Database();
        $db = $database->connect();

        return $db;
    }

   

?>