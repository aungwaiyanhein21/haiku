<?php
    $dir_path = $_SERVER['DOCUMENT_ROOT'].'/haiku/demo/backend/api';

    function upload_image($file) {
        global $dir_path;

        $folder = '/' . 'images/';

        // $target_dir = $_SERVER['DOCUMENT_ROOT'].'/haiku_backend/api/' . $folder;
        $target_dir = $dir_path . $folder;
        
        $target_file_name = uniqid("img_"). '_' . basename($file["name"]);
        $target_file = $target_dir . $target_file_name;
        // $uploadOk = 1;
        // $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));


        $moved = move_uploaded_file($file["tmp_name"], $target_file);
        if ($moved) {
            return array(
                "is_upload_success" => true,
                "image_path" => $folder.$target_file_name
            );
        }
        else {
            return array(
                "is_upload_success" => false,
                "error_message" => $file["error"]
            );
        }
    }

    function copy_image($file_path) {
        global $dir_path;

        $file = $dir_path . $file_path;

        $path_parts = pathinfo(basename($file_path));

        $replaced_file_path = $path_parts['filename'] . '_copy_' . uniqid() . '.' . $path_parts['extension'];

        $new_name = str_replace(basename($file_path), $replaced_file_path, basename($file_path));
        $new_file = $dir_path . '/images' . '/' . $new_name;

        if (!copy($file, $new_file)) {
            return array(
                "is_upload_success" => false,
                "error_message" => "Error in copying image when saving as new connection"
            );
        }

        return array(
            "is_upload_success" => true,
            "image_path" => '/'.'images/'.$new_name
        );
    }

    // function getFullImagePath($pathName) {
    //     return $_SERVER['DOCUMENT_ROOT'].'/haiku_backend/api'.$pathName;
    // }
?>