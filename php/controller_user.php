<?php

include_once 'bd.php';
$bd = new DB();
$output = array('error' => '');
session_start();
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
    else if ($_POST['action'] == "connect" && !empty($_POST['login']) && !empty($_POST['password']) ) {
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
    else if ($_POST['action'] == "getList") {
       
        $sql = "SELECT * FROM utilisateur";
        $response = $bd->query($sql);
        $result = array();
        if ($response) {
            foreach($response as $user) {
                $dataUser = array();
                $dataUser['content'] = $user;
                $data2 = array('id_user' => $user->id);
                $sql2 = "SELECT * FROM produit WHERE id_user=:id_user";
                $response2 = $bd->query($sql2, $data2);
                if ($response2) {
                    $dataUser['products'] = $response2;
                }
                $result[] = $dataUser;
            }
            $output['result'] = $result;
        }
        else {
            $output['error'] = "Erreur de r�cup�ration liste";
        }
   }
}
echo json_encode($output);