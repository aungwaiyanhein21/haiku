<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods');

    // preventing flight test
    include_once '../../utilities/prevent_flight_test.php';

    include_once '../../config/DatabaseConfig.php';
    include_once '../../models/Category.php';

    include_once '../../utilities/sanitize_inputs.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();
 
    // Instantiate  object
    $category = new Category($db);

    // Get raw posted data
    $data = (array) json_decode(file_get_contents("php://input"));

    // sanitize raw data
    $sanitized_data = sanitize_inputs($data);

    // assign data
    foreach ($sanitized_data as $key => $value) {
        $category->columns[$key] = $value;
    }

    // create category
    if ($category->create()) {
        echo json_encode(
            array('message' => 'Category Created', 'isSuccess' => true)
        );
    }
    else {
        echo json_encode(
            array('message' => 'Category Not Created', 'isSuccess' => false)
        );
    }
?>