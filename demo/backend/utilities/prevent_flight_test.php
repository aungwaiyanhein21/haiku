<?php
    function prevent_flight_test($method) {
        if ($method == "OPTIONS") {
            // header('Access-Control-Allow-Origin: *');
            // header("Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods");
            // // header("HTTP/1.1 200 OK");
            die();
        }
    }
    
    $method = $_SERVER['REQUEST_METHOD'];
    prevent_flight_test($method);

   
?>  