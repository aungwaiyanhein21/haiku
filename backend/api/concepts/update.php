<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: PUT');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods');

    // preventing flight test
    include_once '../../utilities/prevent_flight_test.php';

    include_once '../../config/DatabaseConfig.php';
    include_once '../../models/Concept.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate  object
    $concept = new Concept($db);

    // Get raw posted data
    $data = (array) json_decode(file_get_contents("php://input"));

    // set ID to update
    $concept->columns['id'] = $data['id'];

    // update fields
    $concept->columns['concept_name'] = $data['concept_name'];

    // update concept
    if ($concept->update()) {
        echo json_encode(
            array('message' => 'Concept Updated')
        );
    }
    else {
        echo json_encode(
            array('message' => 'Concept Not Updated')
        );
    }
?>