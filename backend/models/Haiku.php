<?php
    class Haiku {
        // DB stuff
        private $conn;
        private $table = 'Haiku';

        // Columns in a table
        public $columns = array(
            'id' => -1,
            'title' => '',
            'published_year' => '',
            'haiku_text' => '',
            'emotion' => '',
            'comments' => '',
            'language_id' => -1,
            'english_translation' => ''
        );

     
        // constructor with DB
        public function __construct($db) {
            $this->conn = $db;
        }

        // get all Haiku information
        public function read() {
            // sql query
            $query = "SELECT * FROM v_haiku";
    
            // Prepare Statement
            $stmt = $this->conn->prepare($query);

            // Execute query
            $stmt->execute();

            return $stmt;
        }

        // get one haiku information based on haiku id
        public function read_single() {
            // sql query
            $query = "SELECT 
                        w.author_id,
                        h.id, h.title, h.published_year, h.haiku_text, h.emotion, h.comments, h.english_translation,
                        t_f.ref_id,
                        lang.id as language_id,
                        h_c.passage_1, h_c.passage_2,
                        h_c.concept_id_1 as concept_1,
                        h_c.concept_id_2 as concept_2,
                        GROUP_CONCAT(b.category_id) as categories
                    FROM Haiku h 
                        INNER JOIN writes w ON w.haiku_id = h.id
                        INNER JOIN taken_from t_f ON t_f.haiku_id = h.id
                        INNER JOIN Languages lang ON lang.id = h.language_id
                        INNER JOIN haiku_concepts h_c ON h_c.haiku_id = h.id 
                        INNER JOIN belongs b ON b.haiku_id = h.id
                    
                        WHERE h.id=:id
                        GROUP BY h.id";
            
            // Prepare Statement
            $stmt = $this->conn->prepare($query);

            // Bind ID
            $stmt->bindValue(':id', $this->columns['id']);
 
            // Execute query
            $stmt->execute();

            return $stmt;
     
        }

        // Create Haiku
        public function create() {
            // query
            $query = "INSERT INTO $this->table 
                (title, published_year, haiku_text, emotion, comments, language_id, english_translation) 
                VALUES 
                (:title, :published_year, :haiku_text, :emotion, :comments, :language_id, :english_translation);";
            
            // prepare statement
            $stmt = $this->conn->prepare($query);

            // bind data
            $stmt->bindValue(':title', $this->columns['title']);
            $stmt->bindValue(':published_year', $this->columns['published_year']);
            $stmt->bindValue(':haiku_text', $this->columns['haiku_text']);
            $stmt->bindValue(':emotion', $this->columns['emotion']);
            $stmt->bindValue(':comments', $this->columns['comments']);
            $stmt->bindValue(':language_id', $this->columns['language_id']);
            $stmt->bindValue(':english_translation', $this->columns['english_translation']);

            // Execute query
            $stmt->execute();
            
            return $this->conn->lastInsertId();
        
        }


        // updated
        public function update() {
            // query
            $query = "UPDATE $this->table 
                SET  
                    title = :title,
                    published_year = :published_year,
                    haiku_text = :haiku_text,
                    emotion = :emotion,
                    comments = :comments,
                    language_id = :language_id,
                    english_translation = :english_translation
                WHERE 
                    id=:id";

            // prepare statement
            $stmt = $this->conn->prepare($query);

            // bind data
            $stmt->bindValue(':id', $this->columns['id']);
            $stmt->bindValue(':title', $this->columns['title']);
            $stmt->bindValue(':published_year', $this->columns['published_year']);
            $stmt->bindValue(':haiku_text', $this->columns['haiku_text']);
            $stmt->bindValue(':emotion', $this->columns['emotion']);
            $stmt->bindValue(':comments', $this->columns['comments']);
            $stmt->bindValue(':language_id', $this->columns['language_id']);
            $stmt->bindValue(':english_translation', $this->columns['english_translation']);

            // Execute query
            $stmt->execute();

            return $this->columns['id'];
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

            printf("Error: $stmt->error.\n");
            return false;
        }
    }
?>