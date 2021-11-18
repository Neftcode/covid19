<?php
	class Connect {

		private $host;
		private $user;
		private $pass;
		private $database;
		private $charset;

		/**
		 * Constructor
		 *
		 * @param   string  $db  Nombre base de datos
		 *
		 * @return  void
		 */
		public function __construct($db) {
			$db_cfg = require_once("databases/".$db.".php");
			$this->host = $db_cfg["host"];
			$this->user = $db_cfg["user"];
			$this->pass = $db_cfg["pass"];
			$this->database = $db_cfg["database"];
			$this->charset = $db_cfg["charset"];
		}

		/**
		 * Función para establecer conexión a base de datos
		 *
		 * @return  object  Referencia a base de datos
		 */
		public function connect() {
			$con = new mysqli($this->host, $this->user, $this->pass, $this->database);
			$con->query("SET NAMES '".$this->charset."'");
			if ($con->connect_errno) {
				echo "Fallo al conectar a Base de Datos: (".$con->connect_errno .") ".$con->connect_error;
			}
			return $con;
		}

	}
?>