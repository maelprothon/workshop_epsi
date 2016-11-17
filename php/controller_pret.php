<?php

include_once 'bd.php';
$bd = new DB();
$output = array('error' => '');
session_start();
//die(var_dump($request));
$postdata = file_get_contents("php://input");
$request = json_decode($postdata, true);

if (isset($request['action'])) {
    if ($request['action'] == "CreatePret" && !empty($request['id_user_1']) && !empty($request['id_produit'])) {
        
        $data = array(
            'id_user_1' => $request['id_user_1'],
            'id_produit' => $request['id_produit'],
            'key_token' => uniqid(),
            'status' => "En cours"
        );
        $sql = "INSERT INTO pret(id_user_1, id_produit, status, token) VALUES(:id_user_1, :id_produit, :status, :key_token)";
        $response = $bd->query($sql, $data);
        $output['result'] = $response;
    }
    
    //update table pret avec la valeur du status , les commentaires er la notation
    else if ($request['action'] == "UpdateValidePret" && $request['id']) {
        $datestart = new DateTime();
        $datestart = $datestart->format("Y-m-d H:i:s");
        $data = array(
            'id' => $request['id'],
            'datestart' => $datestart
                    );
        $sql = "UPDATE pret set status = 'valider', date_start=:datestart where id = :id";
        $response = $bd->query($sql, $data);
    }
    
    //Mis a jour de la table pret à la fin du pret
    else if ($request['action'] == "UpdateEndPret" && $request['token']) {
        $dateend = new DateTime();
        $dateend = $dateend->format("Y-m-d H:i:s");
        $req_token = "SELECT * from pret where token = :token";
        $response = $bd->query($req_token, array('token' => $request['token']));
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

    else if ($request['action'] == "AddCom_notPret" && $request['id'] && $request['commentaire'] && $request['notation']) {
        $data = array(
            'id' => $request['id'],
            'commentaire' => $request['commentaire'],
            'notation' => $request['notation']
                    );
        $sql = "UPDATE pret set commentaire = :commentaire, notation = :notation where id = :id";
        $response = $bd->query($sql, $data);
    }
    
    
}
echo json_encode($output);