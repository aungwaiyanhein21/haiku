<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/DatabaseConfig.php';
    include_once '../../models/Concept.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate object
    $concept = new Concept($db);

    // concept query
    $result = $concept->read();

    $concepts_arr = array();

    $concepts_arr['receivedData'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
     
        $concept_assoc_arr = array(
            'id' => $row['id'],
            'concept_name' => $row['concept_name']
        );

        // push to 'data'
        array_push($concepts_arr['receivedData'], $concept_assoc_arr);
    }

    // Turn to JSON & output
    echo json_encode($concepts_arr);
