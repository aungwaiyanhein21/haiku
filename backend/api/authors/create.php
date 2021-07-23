<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods');

    // preventing flight test
    include_once '../../utilities/prevent_flight_test.php';

    include_once '../../config/DatabaseConfig.php';
    include_once '../../models/Author.php';

    include_once '../../utilities/sanitize_inputs.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();
 
    // Instantiate  object
    $author = new Author($db);

    // Get raw posted data
    // $data brings back object
    $data = (array) json_decode(file_get_contents("php://input"));

    // sanitize raw data
    $sanitized_data = sanitize_inputs($data);

    // assign data
    foreach ($sanitized_data as $key => $value) {
        $author->columns[$key] = $value;
    }

    // create author
    if ($author->create()) {
        echo json_encode(
            array('message' => 'Author Created', 'isSuccess' => true)
        );
    }
    else {
        echo json_encode(
            array('message' => 'Author Not Created', 'isSuccess' => false)
        );
    } 
?>
