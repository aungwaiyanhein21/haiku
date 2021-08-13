<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    // preventing flight test
    include_once '../../utilities/prevent_flight_test.php';

    include_once '../../config/DatabaseConfig.php';
    include_once '../../models/ConceptCategory.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate object
    $conceptCategory = new ConceptCategory($db);

    // query
    $result = $conceptCategory->read();


    $data = array();
    $concept_categories_arr = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $concept_id = (int)$row['concept_id'];
        $category_id = (int)$row['category_id'];

        if (!array_key_exists($category_id, $concept_categories_arr)) {
            // key hasn't exist yet
            $concept_categories_arr[$category_id] = array($concept_id);
        }
        else {
            // key exists
            // push concept id to the existing array
            $concept_categories_arr[$category_id][] = $concept_id;
        }
    }


    // while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    //     $concept_id = (int)$row['concept_id'];
    //     $category_id = (int)$row['category_id'];
        
    //     if (!array_key_exists($concept_id, $concept_categories_arr)){
    //         // key hasn't exist yet
    //        $concept_categories_arr[$concept_id] = array($category_id);
    //     }
    //     else {
    //         // key exists
    //         // push category id to the existing array
    //         $concept_categories_arr[$concept_id][] = $category_id;
    //     }
        
    // }

    $data['receivedData'] = $concept_categories_arr;

    // Turn to JSON & output
    echo json_encode($data);
