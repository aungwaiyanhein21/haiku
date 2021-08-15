<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: multipart/form-data');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods');

    // preventing flight test
    include_once '../../utilities/prevent_flight_test.php';

    include_once '../../config/DatabaseConfig.php';

    include_once '../../models/Haiku.php';
    include_once '../../models/Writes.php';
    // include_once '../../models/TakenFrom.php';
    include_once '../../models/Belongs.php';
    include_once '../../models/HaikuConcepts.php';

    include_once '../../utilities/sanitize_inputs.php';
    include_once '../../utilities/image.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // to make sure the foreign key constraint is ON
    $db->exec('PRAGMA foreign_keys = ON');
 
    // Instantiate  object
    $haiku = new Haiku($db);
    $writes = new Writes($db);
    // $takenFrom = new TakenFrom($db);

    // 2 categories
    $belongs = new Belongs($db);

    // 2 concepts and 2 passages but in one table
    $haikuConcept = new HaikuConcepts($db);


    // // Get raw posted data
    // $data = (array) json_decode(file_get_contents("php://input"));

    $data = $_POST;
    

    // sanitize raw data
    $sanitized_data = sanitize_inputs($data);
   
    // assign data
    // haiku
    $haiku->columns['title'] = $sanitized_data['title'];
    $haiku->columns['published_year'] = $sanitized_data['published_year'];
    $haiku->columns['haiku_text'] = $sanitized_data['haiku_text'];
    $haiku->columns['emotion'] = $sanitized_data['emotion'];
    $haiku->columns['comments'] = $sanitized_data['comments'];
    $haiku->columns['language_id'] = (int)$sanitized_data['language_id'];
    $haiku->columns['english_translation'] = $sanitized_data['english_translation'];
    $haiku->columns['reference'] = $sanitized_data['reference'];

    // writes
    $writes->columns['author_id'] = (int)$sanitized_data['author_id'];

    // // taken from
    // $takenFrom->columns['ref_id'] = $sanitized_data['ref_id'];

    // belongs
    $belongs->columns['category_id_1'] = (int)$sanitized_data['category_1'];
    $belongs->columns['category_id_2'] = (int)$sanitized_data['category_2'];

    // haiku concept
    $haikuConcept->columns['concept_id_1'] = (int)$sanitized_data['concept_1'];
    $haikuConcept->columns['concept_id_2'] = (int)$sanitized_data['concept_2'];
    $haikuConcept->columns['passage_1'] = $sanitized_data['passage_1'];
    $haikuConcept->columns['passage_2'] = $sanitized_data['passage_2'];
    $haikuConcept->columns['passage_1_start_index'] = (int)$sanitized_data['passage_1_start_index'];
    $haikuConcept->columns['passage_1_end_index'] = (int)$sanitized_data['passage_1_end_index'];
    $haikuConcept->columns['passage_2_start_index'] = (int)$sanitized_data['passage_2_start_index'];
    $haikuConcept->columns['passage_2_end_index'] = (int)$sanitized_data['passage_2_end_index'];

  
    try {
        // begin the transaction
        $db->beginTransaction();

        if ($sanitized_data['image_path'] != "" && $_FILES['image']['size'] == 0) {
            // we are trying to save as new connection 
            // and we haven't updated the image so we need to copy and rename the file

            $uploaded_img_info = copy_image($sanitized_data['image_path']);
        }
        else if ($_FILES['image']['size'] != 0){
            // user has uploaded the image
            // so save the image on the server
            $uploaded_img_info = upload_image($_FILES['image']);
        }

        if ($_FILES['image']['size'] == 0 && $sanitized_data['image_path'] == "") {
            // no image has been uploaded or updated so leave the image path as blank
            // on the client side, default image will be shown
            $haiku->columns['image_path'] = "";
        }
        else {
            if ($uploaded_img_info['is_upload_success']) {
                // update image path in haiku
    
                $haiku->columns['image_path'] = $uploaded_img_info['image_path'];
            }
            else {
                throw new Exception($uploaded_img_info["error_message"]);
            }
        }
    
        // insert into Haiku
        $haiku_id = $haiku->create();

        // insert into writes that connects author with haiku
        $writes->create($haiku_id);

        // // insert into 'taken from' that connects haiku with reference 
        // $takenFrom->create($haiku_id);

        // insert into belongs that connects haiku with category 
        $belongs->create($haiku_id);

        // insert into haiku concepts that connects haiku with concepts 
        $haikuConcept->create($haiku_id);
        

        //commit update
        if ($db->commit()) {
            echo json_encode(
                array('message' => 'Haiku created', 'isSuccess' => true)
            );
        }
    }
    catch (PDOException $e) {
        $db->rollBack();

        // also remove the uploaded image

        echo json_encode(
            array('message' => 'Haiku not created', 'errorMessage' => $e, 'isSuccess' => false)
        );
    }
    catch (Exception $e) {
        echo json_encode(
            array('message' => 'Haiku not created because of upload image error', 'errorMessage' => $e->getMessage(), 'isSuccess' => false)
        );
    }






      // // categories
    // $belongs_arr = array();
    // foreach ($sanitized_data['categories'] as $cat_id) {
    //     $belongs = new Belongs($db);
    //     $belongs->columns['category_id'] = $cat_id;
    //     // $concept_category -> columns['category_id']

    //     $belongs_arr[] = $belongs;
    // }

    // // haiku concepts
    // $haiku_concepts_arr = array();
    // $concepts = $sanitized_data['concepts'];
    // for ($indx=0; $indx < count($concepts); $indx+=2) {
    //     $haikuConcepts = new HaikuConcepts($db);

    //     $concept_1 = $concepts[$indx];

    //     if (($indx + 1) == count($concepts)) {
    //         $concept_2 = NULL;
    //     }
    //     else {
    //         $concept_2 = $concepts[$indx + 1];
    //     }

       

    //     //assign data
    //     $haikuConcepts->columns['concept_id_1'] = $concept_1;
    //     $haikuConcepts->columns['concept_id_2'] = $concept_2;
    //     $haikuConcepts->columns['passage_1'] = $sanitized_data['passage_1'];
    //     $haikuConcepts->columns['passage_2'] = $sanitized_data['passage_2'];

    //     // add object to array
    //     $haiku_concepts_arr[] = $haikuConcepts;
    // }
    

    // foreach($belongs_arr as $belongs) {
    //     // insert into belongs using that latest haiku id
    //     $belongs->create($haiku_id);
    // }

    // // insert into haiku concepts
    // foreach($haiku_concepts_arr as $haiku_concepts) {
    //     // insert into belongs using that latest haiku id
    //     $haiku_concepts->create($haiku_id);
    // }
?>

