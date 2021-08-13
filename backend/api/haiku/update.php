<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: multipart/form-data');
    header('Access-Control-Allow-Methods: POST,PUT');
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
    $belongs_1 = new Belongs($db);
    $belongs_2 = new Belongs($db);

    // 2 concepts and 2 passages but in one table
    $haikuConcept = new HaikuConcepts($db);

   
   
    // $full_path = getFullImagePath('/images/img_61074558ecd2b_Screen Shot 2020-12-19 at 12.43.06.png');
    // echo $full_path;

    // $haiku_image_path = '../images/img_61074558ecd2b_Screen Shot 2020-12-19 at 12.43.06.png';
    // $success = unlink($haiku_image_path);
    // if ($success) {
    //     echo "success";
    // }
    // else {
    //     echo "no success";
    // }

    // exit();


    // // Get raw posted data
    // $data = (array) json_decode(file_get_contents("php://input"));

    $data = $_POST;

    // sanitize raw data
    $sanitized_data = sanitize_inputs($data);

    // set ID to update
    $haiku->columns['id'] = $sanitized_data['id'];
   
    // assign data
    // haiku
    $haiku->columns['title'] = $sanitized_data['title'];
    $haiku->columns['published_year'] = $sanitized_data['published_year'];
    $haiku->columns['haiku_text'] = $sanitized_data['haiku_text'];
    $haiku->columns['emotion'] = $sanitized_data['emotion'];
    $haiku->columns['comments'] = $sanitized_data['comments'];
    $haiku->columns['language_id'] = $sanitized_data['language_id'];
    $haiku->columns['english_translation'] = $sanitized_data['english_translation'];
    $haiku->columns['reference'] = $sanitized_data['reference'];
    $haiku->columns['image_path'] = $sanitized_data['image_path'];

    // writes
    $writes->columns['author_id'] = $sanitized_data['author_id'];

    // // taken from
    // $takenFrom->columns['ref_id'] = $sanitized_data['ref_id'];

    // belongs
    $belongs_1->columns['category_id'] = $sanitized_data['category_1'];
    $belongs_2->columns['category_id'] = $sanitized_data['category_2'];

    // haiku concept
    $haikuConcept->columns['concept_id_1'] = $sanitized_data['concept_1'];
    $haikuConcept->columns['concept_id_2'] = $sanitized_data['concept_2'];
    $haikuConcept->columns['passage_1'] = $sanitized_data['passage_1'];
    $haikuConcept->columns['passage_2'] = $sanitized_data['passage_2'];
    $haikuConcept->columns['passage_1_start_index'] = $sanitized_data['passage_1_start_index'];
    $haikuConcept->columns['passage_1_end_index'] = $sanitized_data['passage_1_end_index'];
    $haikuConcept->columns['passage_2_start_index'] = $sanitized_data['passage_2_start_index'];
    $haikuConcept->columns['passage_2_end_index'] = $sanitized_data['passage_2_end_index'];

    try {
        // begin the transaction
        $db->beginTransaction();

        // get the image link from db
        $haiku_image_path = $haiku->read_image_path();

        // check if the new image uploaded to replace the old image 
        if ($_FILES['image']['size'] != 0) {
            // image has been uploaded

          

            if (!empty($haiku_image_path)) {
                // if the path is not empty, remove the image from the server
                unlink('../'.$haiku_image_path);
            }

            // upload new image onto the server
            $uploaded_img_info = upload_image($_FILES['image']);

            if ($uploaded_img_info['is_upload_success']) {
                // update image path in haiku

                $haiku->columns['image_path'] = $uploaded_img_info['image_path'];
            }
            else {
                throw new Exception($uploaded_img_info["error_message"]);
            }
        }
        else {
            $haiku->columns['image_path'] = $haiku_image_path;
        }
        
        // update Haiku
        $haiku_id = $haiku->update();

        // update writes that connects author with haiku
        $writes->update($haiku_id);

        // // update 'taken from' that connects haiku with reference 
        // $takenFrom->update($haiku_id);

        // update belongs that connects haiku with category 
            // first delete rows that have haiku id equal to current haiku id
            // then create rows

        Belongs::delete($haiku_id, $db);

        $belongs_1->create($haiku_id);
        $belongs_2->create($haiku_id);

        // update haiku concepts that connects haiku with concepts 
        $haikuConcept->update($haiku_id);
        

        //commit update
        if ($db->commit()) {
            echo json_encode(
                array('message' => 'Haiku updated', 'isSuccess' => true)
            );
        }
    }
    catch (PDOException $e) {
        $db->rollBack();

        echo json_encode(
            array('message' => 'Haiku not updated', 'errorMessage' => $e, 'isSuccess' => false)
        );
    }
    catch (Exception $e) {
        echo json_encode(
            array('message' => 'Haiku not updated because of image error', 'errorMessage' => $e->getMessage(), 'isSuccess' => false)
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

