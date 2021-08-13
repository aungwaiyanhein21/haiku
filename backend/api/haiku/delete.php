<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: DELETE');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods');

    // preventing flight test
    include_once '../../utilities/prevent_flight_test.php';

    include_once '../../config/DatabaseConfig.php';
    include_once '../../models/Haiku.php';

    include_once '../../utilities/sanitize_inputs.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // to make sure the foreign key constraint is ON
    $db->exec('PRAGMA foreign_keys = ON');

    // Instantiate  object
    $haiku = new Haiku($db);

    // Get raw posted data
    $data = (array) json_decode(file_get_contents("php://input"));
    
    // sanitize raw data
    $sanitized_data = sanitize_inputs($data);

    // assign data
    $haiku->columns['id'] = $sanitized_data['id'];
  
    try {
        // begin the transaction
        $db->beginTransaction();

        // get the image link from db
        $haiku_image_path = $haiku->read_image_path();

        // remove the image from the server
        unlink('../'.$haiku_image_path);


        $haiku -> delete();

        //commit update
        if ($db->commit()) {
            echo json_encode(
                array('message' => 'Haiku has been deleted', 'isSuccess' => true)
            );
        }
    }
    catch (PDOException $e) {
        echo json_encode(
            array('message' => 'Delete Haiku Unsuccessful', 'errorMessage' => $e, 'isSuccess' => false)
        );
    }

?>
