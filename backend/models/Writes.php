<?php
    class Writes {
        // DB stuff
        private $conn;
        private $table = 'writes';

        // Columns in a table
        public $columns = array(
            'author_id' => -1,
            'haiku_id' => -1
        );

        // constructor with DB
        public function __construct($db) {
            $this->conn = $db;
        }

        // create
        public function create($haiku_id) {
            $this->columns['haiku_id'] = $haiku_id;

            // sql query
            $query = "INSERT INTO $this->table 
                (author_id, haiku_id) 
                VALUES 
                (:author_id, :haiku_id);";

            // prepare statement
            $stmt = $this->conn->prepare($query);

            // bind data
            $stmt->bindValue(':author_id', $this->columns['author_id']);
            $stmt->bindValue(':haiku_id', $this->columns['haiku_id']);

            // Execute query
            $stmt->execute();
        }

        // update
        public function update($haiku_id) {
            $this->columns['haiku_id'] = $haiku_id;

            // query
            $query = "UPDATE $this->table 
             SET  
                author_id = :author_id
             WHERE 
                haiku_id = :haiku_id";

            // prepare statement
            $stmt = $this->conn->prepare($query);

            // bind data
            $stmt->bindValue(':author_id', $this->columns['author_id']);
            $stmt->bindValue(':haiku_id', $this->columns['haiku_id']);

            // Execute query
            $stmt->execute();
        }
    }
?>