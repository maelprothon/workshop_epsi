<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include_once 'bd.php';
$bd = new DB();
$output = array('error' => '');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata, true);
if (isset($request['action'])) {
    if ($request['action'] == "create" && !empty($request['name']) && !empty($request['id_user'])
            && !empty($request['type']) && !empty($request['categorie']) ) {
        $data = array(
            'name' => $request['name'],
            'id_user' => $request['id_user'],
            'type' => $request['type'],
            'categorie' => $request['categorie'],
            'description' => $request['description']
        );

        $sql = "INSERT INTO produit(nom,id_user,type,id_categorie,description) VALUES(:name,:id_user,:type,:categorie,:description)";
        $response = $bd->query($sql, $data);
        $output['result'] = "ok"; 
               
    }
   if ($request['action'] == "getListWithUser" && !empty($request['id_user'])) {
        $data = array(
            'id_user' => $request['id_user']
        );    

        $sql = "SELECT * FROM produit WHERE id_user=:id_user"; 
        $response = $bd->query($sql, $data);
        if ($response) {
            $output['result'] = $response;
        }
        else {
            $output['error'] = "Erreur de récupération liste";
        }
   }
    if ($request['action'] == "getListWithObjet" && !empty($request['name'])) {
        $data = array(
            'nom' => $request['name']
        );    

        $sql = "SELECT * FROM produit WHERE nom=:nom"; 
        $response = $bd->query($sql, $data);
        if ($response) {
            $output['result'] = $response;
        }
        else {
            $output['error'] = "Erreur de récupération liste";
        }
    }
    if ($request['action'] == "delete" && !empty($request['id'])) {
        $data = array(
            'id' => $request['id'],
        );    
       
        $sql = "DELETE FROM produit WHERE id=:id";
        $response = $bd->query($sql, $data);
        $output['result'] = 'ok';

   }
   if ($request['action'] == "getProduct" && !empty($request['id'])) {
        $data = array(
            'id' => $request['id']
        );    

        $sql = "SELECT * FROM produit WHERE id=:id"; 
        $response = $bd->query($sql, $data);
        if ($response) {
            $output['result'] = $response;
        }
        else {
            $output['error'] = "Erreur de récupération produit";
        }
    }
}
echo json_encode($output);
