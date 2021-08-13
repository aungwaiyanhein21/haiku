<?php
    class Concept {
        // DB stuff
        private $conn;
        private $table = 'Concept';

        // Columns in a table
        public $columns = array(
            'id' => -1,
            'concept_name' => ''
        );

        // constructor with DB
        public function __construct($db) {
            $this->conn = $db;
        }

        // Get all concepts
        public function read() {
            // sql query
            $query = "SELECT * FROM $this->table ORDER BY concept_name";

            // Prepare Statement
            $stmt = $this->conn->prepare($query);

            // Execute query
            $stmt->execute();

            return $stmt;
        }
    
        // create concept
        public function create() {
            // sql query
            $query = "INSERT INTO $this->table 
                (concept_name) 
                VALUES 
                (:concept_name);";

            // prepare statement
            $stmt = $this->conn->prepare($query);

            // bind data
            $stmt->bindValue(':concept_name', $this->columns['concept_name']);

            // Execute query
            $stmt->execute();
            
            return $this->conn->lastInsertId();
            
            // if ($stmt->execute()) {
            //     return true;
            // }
     
            // printf("Error: $stmt->error.\n");

            // return false;
        }

        // Update
        public function update() {
            $query = "UPDATE $this->table 
            SET  
                concept_name = :concept_name
            WHERE 
                id=:id";

            // prepare statement
            $stmt = $this->conn->prepare($query);

            // clean data
            $this->id = htmlspecialchars(strip_tags($this->id));
            $this->concept_name = htmlspecialchars(strip_tags($this->concept_name));
           

            // Bind data
            $stmt->bindValue(':id', $this->id);
            $stmt->bindValue(':concept_name', $this->concept_name);
           

            // execute query
            if ($stmt->execute()) {
                return true;
            }

            printf("Error: $stmt->error.\n");

            return false;
        }

        // delete
        public function delete() {
            $query = "DELETE FROM $this->table WHERE id=:id";
                
            // Prepare Statement
            $stmt = $this->conn->prepare($query);

            // Bind ID
            $stmt->bindValue(':id', $this->columns['id']);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }
    
    }

?>