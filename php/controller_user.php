<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include_once 'bd.php';
$bd = new DB();
$output = array('error' => '');
session_start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata, true);
if (isset($request['action'])) {
    if ($request['action'] == "create" && !empty($request['name']) && !empty($request['firstname'])
            && !empty($request['password']) && !empty($request['login']) && !empty($request['address']) && !empty($request['codepostal']) && !empty($request['city']) ) {
        $data = array(
            'name' => $request['name'],
            'firstname' => $request['firstname'],
            'password' => md5($request['password']),
            'login' => $request['login'],
            'address' => $request['address'],
            'codepostal' => $request['codepostal'],
            'city' => $request['city']
        );
        $sql = "INSERT INTO utilisateur(nom, prenom, mdp, login, adresse, codepostale, city) VALUES(:name, :firstname, :password, :login, :address, :codepostal, :city)";
        $response = $bd->query($sql, $data);
        $output['result'] = $response;
    }
    else if ($request['action'] == "connect" && !empty($request['login']) && !empty($request['password']) ) {
        $data = array(
            'login' => $request['login'],
            'password' => md5($request['password'])
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
if(!empty($_GET['action'])) {
    if ($_GET['action'] == "getList") {
       
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