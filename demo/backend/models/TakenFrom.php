<?php
    // class TakenFrom {
    //     // DB stuff
    //     private $conn;
    //     private $table = 'taken_from';

    //     // Columns in a table
    //     public $columns = array(
    //         'haiku_id' => -1,
    //         'ref_id' => -1
    //     );

    //     // constructor with DB
    //     public function __construct($db) {
    //         $this->conn = $db;
    //     }

    //     // create concept_category
    //     public function create($haiku_id) {
    //         $this->columns['haiku_id'] = $haiku_id;

    //         // sql query
    //         $query = "INSERT INTO $this->table 
    //             (haiku_id, ref_id) 
    //             VALUES 
    //             (:haiku_id, :ref_id);";

    //         // prepare statement
    //         $stmt = $this->conn->prepare($query);

    //         // bind data
    //         $stmt->bindValue(':haiku_id', $this->columns['haiku_id']);
    //         $stmt->bindValue(':ref_id', $this->columns['ref_id']);

    //         // Execute query
    //         $stmt->execute();
    //     }

    //     // update
    //     public function update($haiku_id) {
    //         $this->columns['haiku_id'] = $haiku_id;

    //         // query
    //         $query = "UPDATE $this->table 
    //          SET  
    //             ref_id = :ref_id
    //          WHERE 
    //             haiku_id = :haiku_id";

    //         // prepare statement
    //         $stmt = $this->conn->prepare($query);

    //         // bind data
    //         $stmt->bindValue(':ref_id', $this->columns['ref_id']);
    //         $stmt->bindValue(':haiku_id', $this->columns['haiku_id']);

    //         // Execute query
    //         $stmt->execute();
    //     }
    // }
?>