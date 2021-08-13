<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    // preventing flight test
    include_once '../../utilities/prevent_flight_test.php';

    include_once '../../config/DatabaseConfig.php';
    include_once '../../models/Author.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate object
    $author = new Author($db);

    // author query
    $result = $author->read();

    $authors_arr = array();

    $authors_arr['data'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        // when we extract, we don't need to say $row['name']. We can just use $name directly
        extract($row);

        $author_assoc_arr = array(
            'id' => $id,
            'literary_name' => $literary_name,
            'first_name' => $first_name,
            'last_name' => $last_name,
            'country' => $country,
            'language' => $language,
            'year_born' => $year_born,
            'year_died' => $year_died
        );

        // push to 'data'
        array_push($authors_arr['data'], $author_assoc_arr);
    }

    // Turn to JSON & output
    echo json_encode($authors_arr);

?>