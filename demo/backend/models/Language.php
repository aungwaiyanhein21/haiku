<?php
    class Language {
        // DB stuff
        private $conn;
        private $table = 'Languages';

        // Columns in a table
        public $columns = array(
            'id' => -1,
            'lang' => ''
        );

        // constructor with DB
        public function __construct($db) {
            $this->conn = $db;
        }

        // Read reference
        public function read() {
            // sql query
            $query = "SELECT * FROM $this->table ORDER BY lang";

            // Prepare Statement
            $stmt = $this->conn->prepare($query);

            // Execute query
            $stmt->execute();

            return $stmt;
        }
    }
?>