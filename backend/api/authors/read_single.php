<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    // preventing flight test
    include_once '../../utilities/prevent_flight_test.php';

    include_once '../../config/DatabaseConfig.php';
    include_once '../../models/Author.php';

    include_once '../../utilities/sanitize_inputs.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate object
    $author = new Author($db);

    // Get ID
    $author->columns['id'] = isset($_GET['id']) ? sanitize_input($_GET['id']) : die();

    $author->read_single();

    // echo json_encode($author->literary_name);

    if (is_null($author->columns['id'])) {
        // if the id has null value that has been returned from database, that means no data found
        // we could use row count here as well.
        echo json_encode(
            array('message' => 'No Author found')
        );
    }
    else {
        // create array
        $author_arr = array();
        foreach ($author->columns as $key => $value) {
            $author_arr[$key] = $value;
        }

        // Turn to JSON & output
        echo json_encode($author_arr);
    }

    

  

?>