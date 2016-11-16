
	Salut c'est EasyTroc
    <?php
    
    include_once 'bd.php';
        try{
            $bdd = new DB();
        } catch (Exception $ex) {
            die('Erreur : '. $ex->getMessage());
        }

    ?>
