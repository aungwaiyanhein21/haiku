<?php
    class ConceptCategory {
        // DB stuff
        private $conn;
        private $table = 'concept_category';

        // Columns in a table
        public $columns = array(
            'concept_id' => -1,
            'category_id' => -1
        );

        // constructor with DB
        public function __construct($db) {
            $this->conn = $db;
        }

        // GROUP_CONCAT(cat.category_name)

        // get concept along with its categories
        public function read() {
            // sql query
            $query = "SELECT * FROM $this->table";

            // Prepare Statement
            $stmt = $this->conn->prepare($query);

            // Execute query
            $stmt->execute();

            return $stmt;
        }

        // // Get all concepts
        // public function read() {
        //     // sql query
        //     $query = 'SELECT * FROM '. $this->table;

        //     // Prepare Statement
        //     $stmt = $this->conn->prepare($query);

        //     // Execute query
        //     $stmt->execute();

        //     return $stmt;
        // }
    
        // create concept_category
        public function create($concept_id) {
            $this->columns['concept_id'] = $concept_id;

            // sql query
            $query = "INSERT INTO $this->table 
                (concept_id, category_id) 
                VALUES 
                (:concept_id, :category_id);";

            // prepare statement
            $stmt = $this->conn->prepare($query);

            // bind data
            $stmt->bindValue(':concept_id', $this->columns['concept_id']);
            $stmt->bindValue(':category_id', $this->columns['category_id']);

            // Execute query
            $stmt->execute();
        }

        // Update
        // public function update() {
        //     $query = "UPDATE $this->table 
        //     SET  
        //         concept_name = :concept_name
        //     WHERE 
        //         id=:id";

        //     // prepare statement
        //     $stmt = $this->conn->prepare($query);

        //     // clean data
        //     $this->id = htmlspecialchars(strip_tags($this->id));
        //     $this->concept_name = htmlspecialchars(strip_tags($this->concept_name));
           

        //     // Bind data
        //     $stmt->bindValue(':id', $this->id);
        //     $stmt->bindValue(':concept_name', $this->concept_name);
           

        //     // execute query
        //     if ($stmt->execute()) {
        //         return true;
        //     }

        //     printf("Error: $stmt->error.\n");

        //     return false;
        // }

        // // delete category
        // public function delete() {
        //     $query = "DELETE FROM $this->table WHERE id=:id";
                
        //     // Prepare Statement
        //     $stmt = $this->conn->prepare($query);

        //     $this->id = htmlspecialchars(strip_tags($this->id));

        //     // Bind ID
        //     $stmt->bindValue(':id', $this->id);

        //     if ($stmt->execute()) {
        //         return true;
        //     }

        //     return false;
        // }
    
    }

?>