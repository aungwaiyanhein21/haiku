<?php
    class Belongs {
        // DB stuff
        private $conn;
        private $table = 'belongs';

        // Columns in a table
        public $columns = array(
            'haiku_id' => -1,
            'category_id' => -1
        );

        // constructor with DB
        public function __construct($db) {
            $this->conn = $db;
        }

        // create concept_category
        public function create($haiku_id) {
            $this->columns['haiku_id'] = $haiku_id;

            // sql query
            $query = "INSERT INTO $this->table 
                (haiku_id, category_id) 
                VALUES 
                (:haiku_id, :category_id);";

            // prepare statement
            $stmt = $this->conn->prepare($query);

            // bind data
            $stmt->bindValue(':haiku_id', $this->columns['haiku_id']);
            $stmt->bindValue(':category_id', $this->columns['category_id']);

            // Execute query
            $stmt->execute();
        }

        // static method for deleting belong data based on haiku id
        public static function delete($haiku_id , $db) {
            $query = "DELETE FROM belongs WHERE haiku_id=:haiku_id";
                
            // Prepare Statement
            $stmt = $db->prepare($query);

            // Bind ID
            $stmt->bindValue(':haiku_id', $haiku_id);

            $stmt->execute();
           
        }
    }
?>