<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

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
        $datediff = "SELECT pre.id_user_1 AS id_sub, pro.id_user AS id_add from pret pre left join produit pro ON pro.id=pre.id_produit where pre.id=:id";
        
        $diff = $bd->query($datediff, array('id'=>$request['id']));
//        $diffs = explode(":", $diff[0]->diff);
//        $hours = intval($diffs[0]) + 1;
        //Soustraire point
        $sub = array(
            'id' => $diff[0]->id_sub,
        );
        $sql_cagnotte_sub = "SELECT cagnotte FROM utilisateur where id=:id";
        
        $cagnotte_sub = $bd->query($sql_cagnotte_sub, $sub);
        $point_sub = $cagnotte_sub[0]->cagnotte - 10;
        $data_sub = array(
            'id' => $diff[0]->id_sub,
            'cagnotte' => $point_sub,
        );
        $sql_update_cagnotte_sub = "UPDATE utilisateur set cagnotte = :cagnotte where id=:id";
        $cagnotte_sub = $bd->query($sql_update_cagnotte_sub, $data_sub);
        
        //Add point
        $add = array(
            'id' => $diff[0]->id_add,
        );
        $sql_cagnotte_add = "SELECT cagnotte FROM utilisateur where id=:id";
        
        $cagnotte_add = $bd->query($sql_cagnotte_add , $add);
        $point_add = $cagnotte_add[0]->cagnotte + 10;
        $data_add = array(
            'id' => $diff[0]->id_add,
            'cagnotte' => $point_add,
        );
        $sql_update_cagnotte_add = "UPDATE utilisateur set cagnotte = :cagnotte where id=:id";
        $cagnotte_add = $bd->query($sql_update_cagnotte_add, $data_add);
        $output['result']['cagnotte'] = $point_add;
    }
    
    //Mis a jour de la table pret à la fin du pret
    else if ($request['action'] == "UpdateEndPret" && $request['token']) {
        $dateend = new DateTime();
        $dateend = $dateend->format("Y-m-d H:i:s");
        $req_token = "SELECT pre.id, pro.id_user from pret pre left join produit pro ON pro.id=pre.id_produit where token = :token";
        $response = $bd->query($req_token, array('token' => $request['token']));
        if ($response) {
            $data = array(
            'id' => $response[0]->id,
            'dateend' => $dateend
                    );
            
        $sql = "UPDATE pret set status = 'Finish', date_end=:dateend where id = :id";
        //Calcul de différence de point
        $response2 = $bd->query($sql, $data);
                 $data = array(
            'id' =>  $response[0]->id,
           );
        
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
    else if ($request['action'] == "getListDemandePret" && $request['id_user']){
        $data = array(
            'id' => $request['id_user'],
            );
        $sql = "SELECT DISTINCT * FROM pret pre LEFT JOIN produit pro ON pre.id_produit=pro.id WHERE pre.id_user_1=:id";
        $response = $bd->query($sql, $data);
        if ($response) {
            $output['result'] = $response;
        }
        else{
            $output['error'] = "Erreur de r�cup�ration liste";
        }
    }
    else if ($request['action'] == "getListPret" && $request['id_user']){
        $data = array(
            'id' => $request['id_user'],
            );
        $sql = "SELECT pre.id as idpret, pre.status, pre.id_produit, pre.id_user_1, pro.* FROM pret pre LEFT JOIN produit pro ON pre.id_produit=pro.id WHERE pro.id_user=:id AND pre.id_user_1!=:id";
        $response = $bd->query($sql, $data);
        if ($response) {
            $output['result'] = $response;
        }
        else{
            $output['error'] = "Erreur de r�cup�ration liste";
        }
    }
}

echo json_encode($output);