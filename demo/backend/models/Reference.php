<?php
    class Reference {
        // DB stuff
        private $conn;
        private $table = 'Reference';

        // Columns in a table
        public $columns = array(
            'id' => -1,
            'ref_link' => ''
        );

        // constructor with DB
        public function __construct($db) {
            $this->conn = $db;
        }

        // Read reference
        public function read() {
            // sql query
            $query = 'SELECT * FROM '. $this->table;

            // Prepare Statement
            $stmt = $this->conn->prepare($query);

            // Execute query
            $stmt->execute();

            return $stmt;
        }

        // Create Reference
        public function create() {
            // sql query
            $query = "INSERT INTO $this->table 
            (ref_link) 
            VALUES 
            (:ref_link);";

            // prepare statement
            $stmt = $this->conn->prepare($query);

            // bind data
            $stmt->bindValue(':ref_link', $this->columns['ref_link']);

            // Execute query
            if ($stmt->execute()) {
                return true;
            }
            // if () {
            //     return true;
            // }

            // return $stmt->error;
        }



    }
?>