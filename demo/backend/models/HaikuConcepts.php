<?php
    class HaikuConcepts {
        // DB stuff
        private $conn;
        private $table = 'haiku_concepts';

        // Columns in a table
        public $columns = array(
            'haiku_id' => -1,
            'concept_id_1' => -1,
            'concept_id_2' => -1,
            'passage_1' => "",
            'passage_2' => "",
            'passage_1_start_index' => -1,
            'passage_1_end_index' => -1,
            'passage_2_start_index' => -1,
            'passage_2_end_index' => -1,
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
              (haiku_id, concept_id_1, concept_id_2, passage_1, passage_2, passage_1_start_index, passage_1_end_index, passage_2_start_index, passage_2_end_index) 
              VALUES 
              (:haiku_id, :concept_id_1, :concept_id_2, :passage_1, :passage_2, :passage_1_start_index, :passage_1_end_index, :passage_2_start_index, :passage_2_end_index);";

          
            // prepare statement
            $stmt = $this->conn->prepare($query);

            // bind data
            $stmt->bindValue(':haiku_id', $this->columns['haiku_id']);
            $stmt->bindValue(':concept_id_1', $this->columns['concept_id_1']);
            $stmt->bindValue(':concept_id_2', $this->columns['concept_id_2']);
            $stmt->bindValue(':passage_1', $this->columns['passage_1']);
            $stmt->bindValue(':passage_2', $this->columns['passage_2']);
            $stmt->bindValue(':passage_1_start_index', $this->columns['passage_1_start_index']);
            $stmt->bindValue(':passage_1_end_index', $this->columns['passage_1_end_index']);
            $stmt->bindValue(':passage_2_start_index', $this->columns['passage_2_start_index']);
            $stmt->bindValue(':passage_2_end_index', $this->columns['passage_2_end_index']);
            
            // Execute query
            $stmt->execute();
        }

        // update
        public function update($haiku_id) {
            $this->columns['haiku_id'] = $haiku_id;

            // query
            $query = "UPDATE $this->table 
             SET  
                concept_id_1 = :concept_id_1,
                concept_id_2 = :concept_id_2,
                passage_1 = :passage_1,
                passage_2 = :passage_2,
                passage_1_start_index=:passage_1_start_index,
                passage_1_end_index=:passage_1_end_index,
                passage_2_start_index=:passage_2_start_index,
                passage_2_end_index=:passage_2_end_index
             WHERE 
                haiku_id = :haiku_id";

            // prepare statement
            $stmt = $this->conn->prepare($query);

            // bind data
            $stmt->bindValue(':concept_id_1', $this->columns['concept_id_1']);
            $stmt->bindValue(':concept_id_2', $this->columns['concept_id_2']);
            $stmt->bindValue(':passage_1', $this->columns['passage_1']);
            $stmt->bindValue(':passage_2', $this->columns['passage_2']);
            $stmt->bindValue(':haiku_id', $this->columns['haiku_id']);
            $stmt->bindValue(':passage_1_start_index', $this->columns['passage_1_start_index']);
            $stmt->bindValue(':passage_1_end_index', $this->columns['passage_1_end_index']);
            $stmt->bindValue(':passage_2_start_index', $this->columns['passage_2_start_index']);
            $stmt->bindValue(':passage_2_end_index', $this->columns['passage_2_end_index']);

            // Execute query
            $stmt->execute();
        }
    }
?>