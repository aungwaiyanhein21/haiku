<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: DELETE');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods');

    include_once '../../config/DatabaseConfig.php';
    include_once '../../models/Concept.php';

    include_once '../../utilities/sanitize_inputs.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // to make sure the foreign key constraint is ON
    $db->exec('PRAGMA foreign_keys = ON');

    // Instantiate  object
    $concept = new Concept($db);

    // Get raw posted data
    $data = (array) json_decode(file_get_contents("php://input"));

    // sanitize raw data
    $sanitized_data = sanitize_inputs($data);


    $concept->columns['id'] = $sanitized_data['id'];

    if ($concept -> delete()) {
        echo json_encode(array(
            'message' => 'Concept Deleted'
        ));
    }
    else {
        echo json_encode(array(
            'message' => 'Concept Not Deleted'
        ));
    }

?>
