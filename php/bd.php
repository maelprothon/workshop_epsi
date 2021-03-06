<?php

class DB {

    private $host = 'prothon.me';
    private $username = 'rootroot';
    private $password = '8a7dd4a1';
    private $database = 'easytroc';
    private $db;

    public function __construct($host = null, $username = null, $password = null, $database = null) {
        if ($host != null) {
            $this->host = $host;
            $this->username = $username;
            $this->password = $password;
            $this->database = $database;
        }
        try {
            $this->db = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->database, $this->username, $this->password, array(
                PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES UTF8',
                PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING
            ));
        } catch (PDOException $e) {
            die('<h1>Impossible de se connecter a la base de donnee</h1>');
        }
    }

    public function query($sql, $data = array()) {
        $req = $this->db->prepare($sql);
        $test = $req->execute($data);
        if ( !$test ) {
            die(var_dump($req->errorCode()));
        }
        // warning learning à voir pour le fetchAll
        return $req->fetchAll(PDO::FETCH_OBJ);
    }

    public function dbescape($string) {
        return $this->db->quote($string);
    }

    public function getPdo() {
        return $this->db;
    }

}
