<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    // preventing flight test
    include_once '../../utilities/prevent_flight_test.php';

    include_once '../../config/DatabaseConfig.php';
    include_once '../../models/Haiku.php';

    include_once '../../utilities/sanitize_inputs.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate object
    $haiku = new Haiku($db);


    /*********************************************
        for getting one haiku based on id
    *********************************************/
    if (isset($_GET['id'])) {
        // get one haiku data based on id

        // Get ID
        $haiku->columns['id'] = sanitize_input($_GET['id']);

        // query
        $stmt = $haiku->read_single();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {

            $haiku_response_data = array();

            $haiku_assoc_arr = array(
                "author_id" => (int)$result['author_id'],
                'id' => (int)$result['id'],
                'title' => $result['title'],
                'published_year' => $result['published_year'],
                'haiku_text' => $result['haiku_text'],
                'emotion' => $result['emotion'],
                'comments' => $result['comments'],
                'english_translation' => $result['english_translation'],
                'reference' => $result['reference'],
                'image_path' => $result['image_path'],
                // 'ref_id' => (int)$result['ref_id'],
                'language_id' => (int)$result['language_id'],
                'passage_1' => $result['passage_1'],
                'passage_2' => $result['passage_2'],
                'passage_1_indexes' => array((int)$result['passage_1_start_index'], (int)$result['passage_1_end_index']),
                'passage_2_indexes' => array((int)$result['passage_2_start_index'], (int)$result['passage_2_end_index']),
                'concept_1' => (int)$result['concept_1'],
                'concept_2' => (int)$result['concept_2'],
                'category_1' => (int)$result['category_1'],
                'category_2' => (int)$result['category_2']
            );

            $haiku_response_data['responseData'] = $haiku_assoc_arr;
            $haiku_response_data['isSuccess'] = true;

            // Turn to JSON & output
            echo json_encode($haiku_response_data);
        }
        else {
            // no haiku found
            echo json_encode(array(
                "message" => "No Haiku with that id found",
                "isSuccess" => false
            ));
        }

        exit();
    }


    /*********************************************
        for getting all haiku
    *********************************************/
    // getting all haiku

    // query
    $result = $haiku->read();

    $haiku_arr = array();

    $haiku_arr['receivedData'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {

        $haiku_assoc_arr = array(
            'author' => $row['literary_name'],
            'id' => (int)$row['id'],
            'title' => $row['title'],
            'published_year' => $row['published_year'],
            'haiku_text' => $row['haiku_text'],
            'emotion' => $row['emotion'],
            'comments' => $row['comments'],
            'english_translation' => $row['english_translation'],
            'reference' => $row['reference'],
            'image_path' => $row['image_path'],
            'language' => $row['language'],
            'passage_1' => $row['passage_1'],
            'passage_2' => $row['passage_2'],
            'passage_1_indexes' => array((int)$row['passage_1_start_index'], (int)$row['passage_1_end_index']),
            'passage_2_indexes' => array((int)$row['passage_2_start_index'], (int)$row['passage_2_end_index']),
            'concept_1' => $row['concept_1'],
            'concept_2' => $row['concept_2'],
            'category_1' => $row['category_1'],
            'category_2' => $row['category_2']
        );

        // push to 'data'
        array_push($haiku_arr['receivedData'], $haiku_assoc_arr);
    }

    // Turn to JSON & output
    echo json_encode($haiku_arr);
