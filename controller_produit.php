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
}
echo json_encode($output);
