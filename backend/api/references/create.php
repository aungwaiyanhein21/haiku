<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods');

    // preventing flight test
    include_once '../../utilities/prevent_flight_test.php';

    include_once '../../config/DatabaseConfig.php';
    include_once '../../models/Reference.php';

    include_once '../../utilities/sanitize_inputs.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();
 
    // Instantiate  object
    $reference = new Reference($db);

    // Get raw posted data
    $data = (array) json_decode(file_get_contents("php://input"));

    // sanitize raw data
    $sanitized_data = sanitize_inputs($data);

    // assign data
    foreach ($sanitized_data as $key => $value) {
        $reference->columns[$key] = $value;
    }

    // create category

    try {
        if ($reference->create()) {
            echo json_encode(
                array('message' => 'Reference Created')
            );
        }
    }
    catch (PDOException $e) {
        echo json_encode(
            array('message' => 'Reference not created', 'errorMessage' => $e)
        );
    }
?>