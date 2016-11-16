<?php
include_once 'bd.php';
$bd = new DB();
$output = array('error' => '');
if (isset($_POST['action'])) {
    if ($_POST['action'] == "create" && !empty($_POST['name']) && !empty($_POST['id_user'])
            && !empty($_POST['type']) && !empty($_POST['categorie']) ) {
        $data = array(
            'name' => $_POST['name'],
            'id_user' => $_POST['id_user'],
            'type' => $_POST['type'],
            'categorie' => $_POST['categorie'],
            'description' => $_POST['description']
        );

        $sql = "INSERT INTO produit(nom,id_user,type,id_categorie,description) VALUES(:name,:id_user,:type,:categorie,:description)";
        $response = $bd->query($sql, $data);
        $output['result'] = "ok"; 
               
    }
   if ($_POST['action'] == "getListWithUser" && !empty($_POST['id_user'])) {
        $data = array(
            'id_user' => $_POST['id_user']
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
    if ($_POST['action'] == "getListWithObjet" && !empty($_POST['name'])) {
        $data = array(
            'nom' => $_POST['name']
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
    if ($_POST['action'] == "delete" && !empty($_POST['id'])) {
        $data = array(
            'id' => $_POST['id'],
        );    
       
        $sql = "DELETE FROM produit WHERE id=:id";
        $response = $bd->query($sql, $data);
        $output['result'] = 'ok';

   }
}
echo json_encode($output);
