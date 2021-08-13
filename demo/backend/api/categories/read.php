<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    // preventing flight test
    include_once '../../utilities/prevent_flight_test.php';

    include_once '../../config/DatabaseConfig.php';
    include_once '../../models/Category.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate object
    $category = new Category($db);

    // category query
    $result = $category->read();

    $categories_arr = array();

    $categories_arr['receivedData'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
     
        $category_assoc_arr = array(
            'id' => $row['id'],
            'category_name' => $row['category_name']
        );

        // push to 'data'
        array_push($categories_arr['receivedData'], $category_assoc_arr);
    }

    // Turn to JSON & output
    echo json_encode($categories_arr);
