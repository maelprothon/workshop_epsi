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
    if ($request['action'] == "getListCategorie") {
        $sql = "SELECT * FROM categorie"; 
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