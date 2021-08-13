<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    // preventing flight test
    include_once '../../utilities/prevent_flight_test.php';

    include_once '../../config/DatabaseConfig.php';
    include_once '../../models/Reference.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate object
    $reference = new Reference($db);

    // reference query
    $result = $reference->read();

    $reference_arr = array();

    $reference_arr['receivedData'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
     
        $ref_assoc_arr = array(
            'id' => $row['id'],
            'ref_link' => $row['ref_link']
        );

        // push to 'data'
        array_push($reference_arr['receivedData'], $ref_assoc_arr);
    }

    // Turn to JSON & output
    echo json_encode($reference_arr);
