<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods');

    // preventing flight test
    include_once '../../utilities/prevent_flight_test.php';

    include_once '../../config/DatabaseConfig.php';

    include_once '../../models/Concept.php';
    include_once '../../models/ConceptCategory.php';

    include_once '../../utilities/sanitize_inputs.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // to make sure the foreign key constraint is ON
    $db->exec('PRAGMA foreign_keys = ON');
 
    // Instantiate  object
    $concept = new Concept($db);
    


    // Get raw posted data
    $data = (array) json_decode(file_get_contents("php://input"));

    // sanitize raw data
    $sanitized_data = sanitize_inputs($data);

    // assign data
    $concept->columns['concept_name'] = $sanitized_data['concept_name'];

    // concept ids
    $concept_category_arr = array();
    foreach ($sanitized_data['category_ids'] as $cat_id) {
        $concept_category = new ConceptCategory($db);
        $concept_category->columns['category_id'] = $cat_id;
        // $concept_category -> columns['category_id']

        $concept_category_arr[] = $concept_category;
    }

    try {
       
        // begin the transaction
        $db->beginTransaction();

        // insert into concept
        $concept_id = $concept->create();

        // insert into concept_category
        foreach($concept_category_arr as $concept_category) {
            // insert into concept category using that latest concept id
            $concept_category->create($concept_id);
        }

        //commit update
        if ($db->commit()) {
            echo json_encode(
                array('message' => 'Concept created', 'isSuccess' => true)
            );
        }
    }
    catch (PDOException $e) {
        $db->rollBack();

        echo json_encode(
            array('message' => 'Concept not created', 'errorMessage' => $e, 'isSuccess' => false)
        );
    }


    // // create concept
    // if ($concept->create()) {
    //     echo json_encode(
    //         array('message' => 'Concept Created')
    //     );
    // }
    // else {
    //     echo json_encode(
    //         array('message' => 'Concept Not Created')
    //     );
    // }
?>