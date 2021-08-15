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
            'english_translation' => '',
            'reference' => '',
            'image_path' => ''
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
                        h.id, h.title, h.published_year, h.haiku_text, h.emotion, h.comments, h.english_translation, h.image_path,
                        h.reference,
                        lang.id as language_id,
                        h_c.passage_1, h_c.passage_2, h_c.passage_1_start_index, h_c.passage_1_end_index, h_c.passage_2_start_index, h_c.passage_2_end_index,
                        h_c.concept_id_1 as concept_1,
                        h_c.concept_id_2 as concept_2,
                        b.category_id_1 as category_1,
                        b.category_id_2 as category_2
                    FROM Haiku h 
                        INNER JOIN writes w ON w.haiku_id = h.id
                       
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

        // get an image path based on id
        public function read_image_path() {
            // sql query
            $query = "SELECT image_path  FROM Haiku WHERE id=:id";
    
            // Prepare Statement
            $stmt = $this->conn->prepare($query);

            // Bind ID
            $stmt->bindValue(':id', $this->columns['id']);
 

            // Execute query
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                return $result['image_path'];
            }

        }
        

        // Create Haiku
        public function create() {
            // query
            $query = "INSERT INTO $this->table 
                (title, published_year, haiku_text, emotion, comments, language_id, english_translation, reference, image_path) 
                VALUES 
                (:title, :published_year, :haiku_text, :emotion, :comments, :language_id, :english_translation, :reference, :image_path);";
            
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
            $stmt->bindValue(':reference', $this->columns['reference']);
            $stmt->bindValue(':image_path', $this->columns['image_path']);

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
                    english_translation = :english_translation,
                    reference = :reference,
                    image_path = :image_path
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
            $stmt->bindValue(':reference', $this->columns['reference']);
            $stmt->bindValue(':image_path', $this->columns['image_path']);

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