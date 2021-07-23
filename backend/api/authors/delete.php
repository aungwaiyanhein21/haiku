<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: DELETE');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods');

    // preventing flight test
    include_once '../../utilities/prevent_flight_test.php';

    include_once '../../config/DatabaseConfig.php';
    include_once '../../models/Author.php';

    include_once '../../utilities/sanitize_inputs.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // to make sure the foreign key constraint is ON
    $db->exec('PRAGMA foreign_keys = ON');


    // Instantiate  object
    $author = new Author($db);

    // Get raw posted data
    $data = (array) json_decode(file_get_contents("php://input"));
    
    // sanitize raw data
    $sanitized_data = sanitize_inputs($data);

    // assign data
    $author->columns['id'] = $sanitized_data['id'];
  

    if ($author -> delete()) {
        echo json_encode(array(
            'message' => 'Author Deleted'
        ));
    }
    else {
        echo json_encode(array(
            'message' => 'Author Not Deleted'
        ));
    }

?>
