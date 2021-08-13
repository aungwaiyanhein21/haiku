<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    // preventing flight test
    include_once '../../utilities/prevent_flight_test.php';

    include_once '../../config/DatabaseConfig.php';
    include_once '../../models/Language.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate object
    $language = new Language($db);

    // query
    $result = $language->read();

    $languages_arr = array();

    $languages_arr['receivedData'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
     
        $language_assoc_arr = array(
            'id' => $row['id'],
            'lang' => $row['lang']
        );

        // push to 'data'
        array_push($languages_arr['receivedData'], $language_assoc_arr);
    }

    // Turn to JSON & output
    echo json_encode($languages_arr);
