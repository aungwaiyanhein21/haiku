<?php 
    // for multiple values
    function sanitize_inputs($inputs) {
        $sanitised_inputs = array();

        foreach($inputs as $key => $value) {
            if (is_array($value)) {
                foreach ($value as $val_2) {
                    if (!is_int($val_2)) {
                        $sanitised_inputs[$key][] = htmlspecialchars(strip_tags($val_2));
                    }
                    else {
                        $sanitised_inputs[$key][] = $val_2;
                    }
                    
                }
            }
            else {
                if (!is_int($value)) {
                    $sanitised_inputs[$key] = htmlspecialchars(strip_tags($value));
                }
                else {
                    $sanitised_inputs[$key] = $value;
                }
                
            }   
        }

        return $sanitised_inputs;
    }

    // for single value
    function sanitize_input($input) {
        if (!is_int($input)) {
            return htmlspecialchars(strip_tags($input));
        }
        return $input;
    };
    
?>