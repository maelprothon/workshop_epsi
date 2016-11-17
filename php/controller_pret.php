<?php

include_once 'bd.php';
$bd = new DB();
$output = array('error' => '');
session_start();
//die(var_dump($_POST));
if (isset($_POST['action'])) {
    if ($_POST['action'] == "CreatePret" && !empty($_POST['id_user_1']) && !empty($_POST['id_produit'])) {
        
        $data = array(
            'id_user_1' => $_POST['id_user_1'],
            'id_produit' => $_POST['id_produit'],
            'key_token' => uniqid(),
            'status' => "En cours"
        );
        $sql = "INSERT INTO pret(id_user_1, id_produit, status, token) VALUES(:id_user_1, :id_produit, :status, :key_token)";
        $response = $bd->query($sql, $data);
        $output['result'] = $response;
    }
    
    //update table pret avec la valeur du status , les commentaires er la notation
    
    if ($_POST['action'] == "UpdateValidePret" && $_POST['id']) {
        $datestart = new DateTime();
        $datestart = $datestart->format("Y-m-d H:i:s");
        $data = array(
            'id' => $_POST['id'],
            'datestart' => $datestart
                    );
        $sql = "UPDATE pret set status = 'valider', date_start=:datestart where id = :id";
        $response = $bd->query($sql, $data);
    }
    
    //Mis a jour de la table pret à la fin du pret
    
    else if ($_POST['action'] == "UpdateEndPret" && $_POST['token']) {
        $dateend = new DateTime();
        $dateend = $dateend->format("Y-m-d H:i:s");
        $req_token = "SELECT * from pret where token = :token";
        $response = $bd->query($req_token, array('token' => $_POST['token']));
        if ($response) {
            $data = array(
            'id' => $response[0]->id,
            'dateend' => $dateend
                    );
        $sql = "UPDATE pret set status = 'Finish', date_end=:dateend where id = :id";
        $response2 = $bd->query($sql, $data);
        }
        else {
            $output['error'] = "Connexion impossible";
        }     
    }
    // add commentaire/note à la fin du prêt
    
    if ($_POST['action'] == "AddCom_notPret" && $_POST['id'] && $_POST['commentaire'] && $_POST['notation']) {
        $data = array(
            'id' => $_POST['id'],
            'commentaire' => $_POST['commentaire'],
            'notation' => $_POST['notation']
                    );
        $sql = "UPDATE pret set commentaire = :commentaire, notation = :notation where id = :id";
        $response = $bd->query($sql, $data);
    }
    
    
}
echo json_encode($output);