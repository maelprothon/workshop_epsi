<?php

include_once 'bd.php';
$bd = new DB();
$output = array('error' => '');
session_start();
//die(var_dump($_POST));
if (isset($_POST['action'])) {
    if ($_POST['action'] == "create" && !empty($_POST['name']) && !empty($_POST['firstname'])
            && !empty($_POST['password']) && !empty($_POST['login']) && !empty($_POST['address']) && !empty($_POST['codepostal']) && !empty($_POST['city']) ) {
        $data = array(
            'name' => $_POST['name'],
            'firstname' => $_POST['firstname'],
            'password' => md5($_POST['password']),
            'login' => $_POST['login'],
            'address' => $_POST['address'],
            'codepostal' => $_POST['codepostal'],
            'city' => $_POST['city']
        );
        $sql = "INSERT INTO utilisateur(nom, prenom, mdp, login, adresse, codepostale, city) VALUES(:name, :firstname, :password, :login, :address, :codepostal, :city)";
        $response = $bd->query($sql, $data);
        $output['result'] = $response;
    }
    if ($_POST['action'] == "connect" && !empty($_POST['login']) && !empty($_POST['password']) ) {
        $data = array(
            'login' => $_POST['login'],
            'password' => md5($_POST['password'])
        );
        $sql = "SELECT * FROM utilisateur WHERE login=:login AND mdp=:password";
        $response = $bd->query($sql, $data);
        if ($response) {
            $output['result'] = $response;
            $_SESSION['user'] = $response[0]->login;
        }
        else {
            $output['error'] = "Connexion impossible";
        }
    }
}
echo json_encode($output);