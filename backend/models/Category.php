<?php
    class Category {
        // DB stuff
        private $conn;
        private $table = 'Category';

        // Columns in a table
        public $columns = array(
            'id' => -1,
            'category_name' => ''
        );  

        // constructor with DB
        public function __construct($db) {
            $this->conn = $db;
        }

        // Get all categories
        public function read() {
            // sql query
            $query = "SELECT * FROM $this->table ORDER BY category_name";

            // Prepare Statement
            $stmt = $this->conn->prepare($query);

            // Execute query
            $stmt->execute();

            return $stmt;
        }
    
        // create category
        public function create() {

            // sql query
            $query = "INSERT INTO $this->table 
                (category_name) 
                VALUES 
                (:category_name);";

            // prepare statement
            $stmt = $this->conn->prepare($query);

            // bind data
            $stmt->bindValue(':category_name', $this->columns['category_name']);

            // Execute query
            if ($stmt->execute()) {
                return true;
            }
     
            printf("Error: $stmt->error.\n");

            return false;

        }

        // Update
        public function update() {
            $query = "UPDATE $this->table 
            SET  
                category_name = :category_name
            WHERE 
                id=:id";

            // prepare statement
            $stmt = $this->conn->prepare($query);

           
            // Bind data
            $stmt->bindValue(':id', $this->columns['id']);
            $stmt->bindValue(':category_name', $this->columns['category_name']);
           

            // execute query
            if ($stmt->execute()) {
                return true;
            }

            printf("Error: $stmt->error.\n");

            return false;
        }

        // delete category
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