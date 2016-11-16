<?php

include_once "DBEntity.php";

class Game {
	public $id;
	public $name;
	public $values;
	public $score;
	public $valuesNon;

	function __construct($id) {
		$DB = new DB();
		$result = $DB->query("SELECT * FROM game WHERE id=:id", $arrayName = array('id' => $id ));
		$this->id = $result[0]->id;
		$this->name = $result[0]->name;
		$sql = "SELECT * FROM game_questions gq
				LEFT JOIN question q ON gq.idQuestion = q.id
				WHERE idGame=:id AND ( Reponse='Oui' OR Reponse='oui')";
		$resultQuestion = $DB->query($sql, $arrayName = array('id' => $id ));
		$this->values = $resultQuestion;
		$sql = "SELECT * FROM game_questions gq
				LEFT JOIN question q ON gq.idQuestion = q.id
				WHERE idGame=:id AND ( Reponse='Non' OR Reponse='non')";
		$resultQuestion = $DB->query($sql, $arrayName = array('id' => $id ));
		$this->valuesNon = $resultQuestion;
	}

	public static function get_games($excludeids = null) {
		$DB = new DB();
		$where = "";
		if ( $excludeids ) {
			$where .= " WHERE id NOT IN (".implode(",", $excludeids). ") ";
		}
		$result = $DB->query("SELECT * FROM game".$where);
		$response = array();
		foreach ( $result as $game ) {
			$response[] = new Game($game->id);
		}
		return $response;
	}

	public function hasQuestion($idQuestion) {
		foreach ( $this->values as $v ) {
			if ( $v->idQuestion == $idQuestion ) {
				return true;
			}
		}
		return false;
	}

	public function hasQuestionNo($idQuestion) {
		foreach ( $this->valuesNon as $v ) {
			if ( $v->idQuestion == $idQuestion ) {
				return true;
			}
		}
		return false;
	}

	public static function count_games() {
		$DB = new DB();
		$result = $DB->query("SELECT COUNT(*) as nb FROM game");
		return $result[0]->nb;
	}


}
?>