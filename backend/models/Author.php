<?php
    class Author {
        // DB stuff
        private $conn;
        private $table = 'Author';

        // Columns in a table
        public $columns = array(
            'id' => -1,
            'literary_name' => '',
            'first_name' => '',
            'last_name' => '',
            'country' => '',
            'language' => '',
            'year_born' => '',
            'year_died' => ''
        );
        
        // constructor with DB
        public function __construct($db) {
            $this->conn = $db;
        }

        // Get Authors
        public function read() {
            // sql query
            $query = "SELECT * FROM $this->table ORDER BY literary_name";

            // Prepare Statement
            $stmt = $this->conn->prepare($query);

            // Execute query
            $stmt->execute();

            return $stmt;
        }

        // Get a Single Author
        public function read_single() {
            // sql query
            $query = "SELECT * FROM $this->table WHERE id=:id";
                
            // Prepare Statement
            $stmt = $this->conn->prepare($query);

            // Bind ID
            $stmt->bindValue(':id', $this->columns['id']);

            // Execute query
            $stmt->execute();

            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            // Set properties
            $this->columns['id'] = $row['id'];
            $this->columns['literary_name'] = $row['literary_name'];
            $this->columns['first_name'] = $row['first_name'];
            $this->columns['last_name'] = $row['last_name'];
            $this->columns['country'] = $row['country'];
            $this->columns['language'] = $row['language'];
            $this->columns['year_born'] = $row['year_born'];
            $this->columns['year_died'] = $row['year_died'];
            
        }

        // Create Author
        public function create() {
            // query
            $query = "INSERT INTO $this->table 
                (literary_name, first_name, last_name, country, language, year_born, year_died) 
                VALUES 
                (:literary_name, :first_name, :last_name, :country, :language, :year_born, :year_died);";
            
            // prepare statement
            $stmt = $this->conn->prepare($query);

            // // bind data
            // foreach ($this->columns as $key => $value) {
            //     $stmt->bindValue(":$key", $value);
            // }

            // bind value
            $stmt->bindValue(':literary_name', $this->columns['literary_name']);
            $stmt->bindValue(':first_name', $this->columns['first_name']);
            $stmt->bindValue(':last_name', $this->columns['last_name']);
            $stmt->bindValue(':country', $this->columns['country']);
            $stmt->bindValue(':language', $this->columns['language']);
            $stmt->bindValue(':year_born', $this->columns['year_born']);
            $stmt->bindValue(':year_died', $this->columns['year_died']);

            
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
                literary_name = :literary_name,
                first_name = :first_name,
                last_name = :last_name,
                country = :country,
                language = :language,
                year_born = :year_born,
                year_died = :year_died
            WHERE 
                id=:id";

            // prepare statement
            $stmt = $this->conn->prepare($query);

            // Bind data
            $stmt->bindValue(':id', $this->columns['id']);
            $stmt->bindValue(':literary_name', $this->columns['literary_name']);
            $stmt->bindValue(':first_name', $this->columns['first_name']);
            $stmt->bindValue(':last_name', $this->columns['last_name']);
            $stmt->bindValue(':country', $this->columns['country']);
            $stmt->bindValue(':language', $this->columns['language']);
            $stmt->bindValue(':year_born', $this->columns['year_born']);
            $stmt->bindValue(':year_died', $this->columns['year_died']);

            // execute query
            if ($stmt->execute()) {
                return true;
            }

            printf("Error: $stmt->error.\n");

            return false;
        }

        // Delete
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