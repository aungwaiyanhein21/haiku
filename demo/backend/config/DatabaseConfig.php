<?php
    // include_once '../root_directory.php';


    define('DB_PATH', $_SERVER['DOCUMENT_ROOT'].'/haiku/demo/backend/haiku.db');
    class Database {
        private $conn;

        // DB connect
        public function connect() {
            $this->conn = null;

            try {
                $this->conn = new PDO('sqlite:'.DB_PATH);
               
                $this->conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
                
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                
            }
            catch (PDOException $e) {
                echo 'Connection Error: '. $e->getMessage();
            }

            return $this->conn;
        }
    }
?>