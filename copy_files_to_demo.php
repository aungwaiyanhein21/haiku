<?php
    echo "\ncopying files...\n";

    $root_path = __DIR__;

    // copy haiku.db
    $source_path = "$root_path/backend/haiku.db";
    $dest_path = "$root_path/demo/backend/haiku.db";

    $copied_db_file = copy($source_path, $dest_path);
    if ($copied_db_file) {
        echo "Successfully copied db file to demo";
    }
    else {
        echo "Not able to copy db file to demo";
    }

    echo "\n";


    // copy images folder

    function remove_img_files($folder) {
        
        // Get all files names in image folder.
        $files = glob($folder . '/*');
        
        // go through each file
        foreach($files as $file) {
            
            // Check if it is a file
            if(is_file($file)) {
                
                // delete the file.
                unlink($file);
            }
        }
    }

    function copy_img_files($src, $dest) {
      
        // if the destination directory does not exist, make one
        if (!file_exists($dest)) {
            mkdir($dest); 
        }
        else {
            // remove existing files
            remove_img_files($dest);
        }
        
        // open the source directory
        $dir = opendir($src);

        // go through files in source directory
        while ($file = readdir($dir)) {
            // while there is next file in that folder
            
            if (($file != '.') && ($file != '..')) {
                if (is_dir("$src/$file")) {
                    // Recursively call for sub directory if there is still sub directories
                    
                    copy_img_files("$src/$file", "$dest/$file");
                }
                else {
                    $copied = copy("$src/$file", "$dest/$file");
                    if (!$copied) return false;
                }
            }
        }

        closedir($dir);

        return true;
      
    }

    $source_path = "$root_path/backend/api/images";
    $dest_path = "$root_path/demo/backend/api/images";

    $copied = copy_img_files($source_path, $dest_path);
   
    if ($copied) {
        echo "Successfully copied img files from backend to demo";
    }
    else {
        echo "Not able to copy img files to demo";
    }
      
?>