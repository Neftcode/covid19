<?php
    class Entity {
        
        private $table;
        private $db;

        public function __construct($table, $connection) {
            $this->table = (string) $table;
            $this->db = $connection;
        }

        public function getTable() {
            return $this->table;
        }

        public function getDb() {
            return $this->db;
        }

        public function setTable($table) {
            $this->table = $table;
        }

        public function get_result($stmt) {
            $arrResult = array();
            $stmt->store_result();
            for ($i=0; $i<$stmt->num_rows; $i++) {
                $metadata = $stmt->result_metadata();
                $arrParams = array();
                while ($field=$metadata->fetch_field()) {
                    $arrParams[] = &$arrResult[$i][$field->name];
                }
                call_user_func_array(array( $stmt, 'bind_result'), $arrParams);
                $stmt->fetch();
            }
            return $arrResult;
        }

        public function sql($queryP) {
            $query = $this->getDb()->query($queryP);
            if ($query) {
                if ($query->num_rows==1) {
                    $resultSet = $query->fetch_array();
                } elseif ($query->num_rows>1) {
                    $resultado = $this->get_result($query);
                    $resultSet = [];
                    foreach ($resultado AS $row) {
                        $resultSet[] = $row;
                    }
                } else {
                    $resultSet = true;
                }
            } else {
                $resultSet = false;
            }
            $query->close();
            return $resultSet;
        }

        public function getAll($order="DESC") {
            $query = $this->getDb()->prepare("SELECT * FROM ".$this->getTable()." ORDER BY id ".$order);
            $query->execute();
            $resultado = $this->get_result($query);
            $query->close();
            $resultSet = [];
            foreach ($resultado AS $row) {
                $resultSet[] = $row;
            }
            return $resultSet;
        }

        public function getById($id) {
            $query = $this->getDb()->prepare("SELECT * FROM ? WHERE id=?");
            $query->bind_param('ss', $this->getTable(), $id);
            $query->execute();
            $resultSet = [];
            if ($query->get_result()->num_rows>0) {
                $resultSet = $query->get_result()->fetch_array();
            }
            $query->close();
            return $resultSet;
        }

        public function getBy($column, $value) {
            $query = $this->getDb()->prepare("SELECT * FROM ? WHERE ?=?");
            $query->bind_param('sss', $this->getTable(), $column, $value);
            $query->execute();
            $resultado = $this->get_result($query);
            $query->close();
            $resultSet = [];
            foreach ($resultado AS $row) {
                $resultSet[] = $row;
            }
            return $resultSet;
        }

        public function getCovidCountries() {
            $query = $this->getDb()->prepare("SELECT TER.`ter_iso_alpha3` AS ISO, COUNT(`pais_procedencia`) AS CANTIDAD FROM `covid_colombia` AS COV LEFT JOIN `territorio` AS TER ON COV.`pais_procedencia`=TER.`id` GROUP BY TER.`ter_iso_alpha3` ORDER BY TER.`ter_iso_alpha3`");
            $query->execute();
            $resultado = $this->get_result($query);
            $query->close();
            return $resultado;
        }

        public function getCovidColombia() {
            $query = $this->getDb()->prepare("SELECT DEP.`dep_cod_dane` AS ID_DANE, COUNT(DEP.`dep_cod_dane`) AS CANTIDAD FROM `covid_colombia` AS COV LEFT JOIN `ciudadcol` AS CIU ON COV.`codigo_municipio`=CIU.`id` LEFT JOIN `departamentocol` AS DEP ON CIU.`ciu_deptocol_id`=DEP.`id` GROUP BY DEP.`dep_cod_dane` ORDER BY DEP.`dep_nombre`");
            $query->execute();
            $resultado = $this->get_result($query);
            $query->close();
            return $resultado;
        }

        public function getCovidSituation() {
            $query = $this->getDb()->prepare("SELECT `atencion` AS ATENCION, COUNT(`atencion`) AS TOTAL FROM `covid_colombia` GROUP BY `atencion` ORDER BY `atencion`");
            $query->execute();
            $resultado = $this->get_result($query);
            $query->close();
            return $resultado;
        }

        public function getCovidGender() {
            $query = $this->getDb()->prepare("SELECT `sexo` AS GENERO, COUNT(`sexo`) AS CANTIDAD, (SELECT COUNT(ACT.`atencion`) FROM `covid_colombia` AS ACT WHERE ACT.`atencion` NOT IN ('Fallecido', 'Recuperado') AND ACT.`sexo`=COV.`sexo`) AS ACTIVOS, (SELECT COUNT(MUE.`atencion`) FROM `covid_colombia` AS MUE WHERE MUE.`atencion` IN ('Fallecido') AND MUE.`sexo`=COV.`sexo`) AS MUERTOS, (SELECT COUNT(REC.`atencion`) FROM `covid_colombia` AS REC WHERE REC.`atencion` IN ('Recuperado') AND REC.`sexo`=COV.`sexo`) AS RECUPERADOS FROM `covid_colombia` AS COV GROUP BY `sexo` ORDER BY `sexo`");
            $query->execute();
            $resultado = $this->get_result($query);
            $query->close();
            return $resultado;
        }

        public function getCovidAges($atencion) {
            $query = $this->getDb()->prepare("SELECT ? AS ATENCION, (SELECT COUNT(R0.`edad`) FROM `covid_colombia` AS R0 WHERE R0.`atencion`=? AND `edad` BETWEEN 0 AND 9) AS '0-9', (SELECT COUNT(R1.`edad`) FROM `covid_colombia` AS R1 WHERE R1.`atencion`=? AND `edad` BETWEEN 10 AND 19) AS '10-19', (SELECT COUNT(R2.`edad`) FROM `covid_colombia` AS R2 WHERE R2.`atencion`=? AND `edad` BETWEEN 20 AND 29) AS '20-29', (SELECT COUNT(R3.`edad`) FROM `covid_colombia` AS R3 WHERE R3.`atencion`=? AND `edad` BETWEEN 30 AND 39) AS '30-39', (SELECT COUNT(R4.`edad`) FROM `covid_colombia` AS R4 WHERE R4.`atencion`=? AND `edad` BETWEEN 40 AND 49) AS '40-49', (SELECT COUNT(R5.`edad`) FROM `covid_colombia` AS R5 WHERE R5.`atencion`=? AND `edad` BETWEEN 50 AND 59) AS '50-59', (SELECT COUNT(R6.`edad`) FROM `covid_colombia` AS R6 WHERE R6.`atencion`=? AND `edad` BETWEEN 60 AND 69) AS '60-69', (SELECT COUNT(R7.`edad`) FROM `covid_colombia` AS R7 WHERE R7.`atencion`=? AND `edad` BETWEEN 70 AND 79) AS '70-79', (SELECT COUNT(R8.`edad`) FROM `covid_colombia` AS R8 WHERE R8.`atencion`=? AND `edad` BETWEEN 80 AND 89) AS '80-89', (SELECT COUNT(R9.`edad`) FROM `covid_colombia` AS R9 WHERE R9.`atencion`=? AND `edad`>=90) AS '>=90'");
            $query->bind_param('sssssssssss', $atencion, $atencion, $atencion, $atencion, $atencion, $atencion, $atencion, $atencion, $atencion, $atencion, $atencion);
            $query->execute();
            $resultado = $this->get_result($query);
            $query->close();
            return $resultado;
        }

        public function getCovidAgesActive() {
            $query = $this->getDb()->prepare("SELECT 'Activos' AS ATENCION, (SELECT COUNT(R0.`edad`) FROM `covid_colombia` AS R0 WHERE R0.`atencion` NOT IN ('Fallecido', 'Recuperado') AND `edad` BETWEEN 0 AND 9) AS '0-9', (SELECT COUNT(R1.`edad`) FROM `covid_colombia` AS R1 WHERE R1.`atencion` NOT IN ('Fallecido', 'Recuperado') AND `edad` BETWEEN 10 AND 19) AS '10-19', (SELECT COUNT(R2.`edad`) FROM `covid_colombia` AS R2 WHERE R2.`atencion` NOT IN ('Fallecido', 'Recuperado') AND `edad` BETWEEN 20 AND 29) AS '20-29', (SELECT COUNT(R3.`edad`) FROM `covid_colombia` AS R3 WHERE R3.`atencion` NOT IN ('Fallecido', 'Recuperado') AND `edad` BETWEEN 30 AND 39) AS '30-39', (SELECT COUNT(R4.`edad`) FROM `covid_colombia` AS R4 WHERE R4.`atencion` NOT IN ('Fallecido', 'Recuperado') AND `edad` BETWEEN 40 AND 49) AS '40-49', (SELECT COUNT(R5.`edad`) FROM `covid_colombia` AS R5 WHERE R5.`atencion` NOT IN ('Fallecido', 'Recuperado') AND `edad` BETWEEN 50 AND 59) AS '50-59', (SELECT COUNT(R6.`edad`) FROM `covid_colombia` AS R6 WHERE R6.`atencion` NOT IN ('Fallecido', 'Recuperado') AND `edad` BETWEEN 60 AND 69) AS '60-69', (SELECT COUNT(R7.`edad`) FROM `covid_colombia` AS R7 WHERE R7.`atencion` NOT IN ('Fallecido', 'Recuperado') AND `edad` BETWEEN 70 AND 79) AS '70-79', (SELECT COUNT(R8.`edad`) FROM `covid_colombia` AS R8 WHERE R8.`atencion` NOT IN ('Fallecido', 'Recuperado') AND `edad` BETWEEN 80 AND 89) AS '80-89', (SELECT COUNT(R9.`edad`) FROM `covid_colombia` AS R9 WHERE R9.`atencion` NOT IN ('Fallecido', 'Recuperado') AND `edad`>=90) AS '>=90'");
            $query->execute();
            $resultado = $this->get_result($query);
            $query->close();
            return $resultado;
        }

        public function getCovidCurve() {
            $query = $this->getDb()->prepare("SELECT UNIX_TIMESTAMP(`fecha_notificacion`) AS UNIX, `fecha_notificacion` AS FECHA, COUNT(`fecha_notificacion`) AS CANTIDAD FROM `covid_colombia` WHERE `fecha_notificacion`!='SIN DATO' GROUP BY `fecha_notificacion` ORDER BY `fecha_notificacion` ASC");
            $query->execute();
            $resultado = $this->get_result($query);
            $query->close();
            return $resultado;
        }

        public function getCovidBogota() {
            $query = $this->getDb()->prepare("SELECT COUNT(LCAS.`id`) AS CANTIDAD, LCAS.`id`, `lca_localidad`, `lca_fecha_inicio`, `lca_fecha_diagnostico`, `lca_edad`, `lca_uni_med`, `lca_sexo`, `lca_fuente`, `lca_ubicacion`, `lca_estado`, LCIU.`lci_nombre`, LCIU.`lci_cod`, CIU.`ciu_nombre` FROM `localidad_casos` AS LCAS LEFT JOIN `localidad_ciudad` AS LCIU ON LCAS.`lca_localidad`=LCIU.`id` LEFT JOIN `ciudadcol` AS CIU ON LCIU.`lci_ciudad_id`=CIU.`id` GROUP BY `lca_localidad`");
            $query->execute();
            $resultado = $this->get_result($query);
            $query->close();
            return $resultado;
        }

        public function getCovidBogotaSituation() {
            $query = $this->getDb()->prepare("SELECT `lca_estado` AS ATENCION, COUNT(`lca_estado`) AS TOTAL FROM `localidad_casos` AS LCAS LEFT JOIN `localidad_ciudad` AS LCIU ON LCAS.`lca_localidad`=LCIU.`id` GROUP BY `lca_estado` ORDER BY `lca_estado`");
            $query->execute();
            $resultado = $this->get_result($query);
            $query->close();
            return $resultado;
        }

        public function getCovidBogotaGender() {
            $query = $this->getDb()->prepare("SELECT `lca_sexo` AS GENERO, COUNT(`lca_sexo`) AS CANTIDAD, (SELECT COUNT(ACT.`lca_estado`) FROM `localidad_casos` AS ACT WHERE ACT.`lca_estado` NOT IN ('Fallecido', 'Fallecido No aplica No causa Directa', 'Recuperado') AND ACT.`lca_sexo`=COV.`lca_sexo`) AS ACTIVOS, (SELECT COUNT(MUE.`lca_estado`) FROM `localidad_casos` AS MUE WHERE MUE.`lca_estado` IN ('Fallecido', 'Fallecido No aplica No causa Directa') AND MUE.`lca_sexo`=COV.`lca_sexo`) AS MUERTOS, (SELECT COUNT(REC.`lca_estado`) FROM `localidad_casos` AS REC WHERE REC.`lca_estado` IN ('Recuperado') AND REC.`lca_sexo`=COV.`lca_sexo`) AS RECUPERADOS FROM `localidad_casos` AS COV GROUP BY `lca_sexo` ORDER BY `lca_sexo`");
            $query->execute();
            $resultado = $this->get_result($query);
            $query->close();
            return $resultado;
        }

        public function getCovidBogotaCurve() {
            $query = $this->getDb()->prepare("SELECT UNIX_TIMESTAMP(`lca_fecha_diagnostico`) AS UNIX, `lca_fecha_diagnostico` AS FECHA, COUNT(`lca_fecha_diagnostico`) AS CANTIDAD FROM `localidad_casos` GROUP BY `lca_fecha_diagnostico` ORDER BY `lca_fecha_diagnostico` ASC");
            $query->execute();
            $resultado = $this->get_result($query);
            $query->close();
            return $resultado;
        }

        public function getCovidBogotaAgesDeath() {
            $query = $this->getDb()->prepare("SELECT 'Fallecido' AS ATENCION, (SELECT COUNT(R0.`lca_edad`) FROM `localidad_casos` AS R0 WHERE R0.`lca_estado` IN ('Fallecido', 'Fallecido No aplica No causa Directa') AND `lca_edad` BETWEEN 0 AND 9) AS '0-9', (SELECT COUNT(R1.`lca_edad`) FROM `localidad_casos` AS R1 WHERE R1.`lca_estado` IN ('Fallecido', 'Fallecido No aplica No causa Directa') AND `lca_edad` BETWEEN 10 AND 19) AS '10-19', (SELECT COUNT(R2.`lca_edad`) FROM `localidad_casos` AS R2 WHERE R2.`lca_estado` IN ('Fallecido', 'Fallecido No aplica No causa Directa') AND `lca_edad` BETWEEN 20 AND 29) AS '20-29', (SELECT COUNT(R3.`lca_edad`) FROM `localidad_casos` AS R3 WHERE R3.`lca_estado` IN ('Fallecido', 'Fallecido No aplica No causa Directa') AND `lca_edad` BETWEEN 30 AND 39) AS '30-39', (SELECT COUNT(R4.`lca_edad`) FROM `localidad_casos` AS R4 WHERE R4.`lca_estado` IN ('Fallecido', 'Fallecido No aplica No causa Directa') AND `lca_edad` BETWEEN 40 AND 49) AS '40-49', (SELECT COUNT(R5.`lca_edad`) FROM `localidad_casos` AS R5 WHERE R5.`lca_estado` IN ('Fallecido', 'Fallecido No aplica No causa Directa') AND `lca_edad` BETWEEN 50 AND 59) AS '50-59', (SELECT COUNT(R6.`lca_edad`) FROM `localidad_casos` AS R6 WHERE R6.`lca_estado` IN ('Fallecido', 'Fallecido No aplica No causa Directa') AND `lca_edad` BETWEEN 60 AND 69) AS '60-69', (SELECT COUNT(R7.`lca_edad`) FROM `localidad_casos` AS R7 WHERE R7.`lca_estado` IN ('Fallecido', 'Fallecido No aplica No causa Directa') AND `lca_edad` BETWEEN 70 AND 79) AS '70-79', (SELECT COUNT(R8.`lca_edad`) FROM `localidad_casos` AS R8 WHERE R8.`lca_estado` IN ('Fallecido', 'Fallecido No aplica No causa Directa') AND `lca_edad` BETWEEN 80 AND 89) AS '80-89', (SELECT COUNT(R9.`lca_edad`) FROM `localidad_casos` AS R9 WHERE R9.`lca_estado` IN ('Fallecido', 'Fallecido No aplica No causa Directa') AND `lca_edad`>=90) AS '>=90'");
            $query->execute();
            $resultado = $this->get_result($query);
            $query->close();
            return $resultado;
        }

        public function getCovidBogotaAgesActive() {
            $query = $this->getDb()->prepare("SELECT 'Activos' AS ATENCION, (SELECT COUNT(R0.`lca_edad`) FROM `localidad_casos` AS R0 WHERE R0.`lca_estado` NOT IN ('Fallecido', 'Fallecido No aplica No causa Directa', 'Recuperado') AND `lca_edad` BETWEEN 0 AND 9) AS '0-9', (SELECT COUNT(R1.`lca_edad`) FROM `localidad_casos` AS R1 WHERE R1.`lca_estado` NOT IN ('Fallecido', 'Fallecido No aplica No causa Directa', 'Recuperado') AND `lca_edad` BETWEEN 10 AND 19) AS '10-19', (SELECT COUNT(R2.`lca_edad`) FROM `localidad_casos` AS R2 WHERE R2.`lca_estado` NOT IN ('Fallecido', 'Fallecido No aplica No causa Directa', 'Recuperado') AND `lca_edad` BETWEEN 20 AND 29) AS '20-29', (SELECT COUNT(R3.`lca_edad`) FROM `localidad_casos` AS R3 WHERE R3.`lca_estado` NOT IN ('Fallecido', 'Fallecido No aplica No causa Directa', 'Recuperado') AND `lca_edad` BETWEEN 30 AND 39) AS '30-39', (SELECT COUNT(R4.`lca_edad`) FROM `localidad_casos` AS R4 WHERE R4.`lca_estado` NOT IN ('Fallecido', 'Fallecido No aplica No causa Directa', 'Recuperado') AND `lca_edad` BETWEEN 40 AND 49) AS '40-49', (SELECT COUNT(R5.`lca_edad`) FROM `localidad_casos` AS R5 WHERE R5.`lca_estado` NOT IN ('Fallecido', 'Fallecido No aplica No causa Directa', 'Recuperado') AND `lca_edad` BETWEEN 50 AND 59) AS '50-59', (SELECT COUNT(R6.`lca_edad`) FROM `localidad_casos` AS R6 WHERE R6.`lca_estado` NOT IN ('Fallecido', 'Fallecido No aplica No causa Directa', 'Recuperado') AND `lca_edad` BETWEEN 60 AND 69) AS '60-69', (SELECT COUNT(R7.`lca_edad`) FROM `localidad_casos` AS R7 WHERE R7.`lca_estado` NOT IN ('Fallecido', 'Fallecido No aplica No causa Directa', 'Recuperado') AND `lca_edad` BETWEEN 70 AND 79) AS '70-79', (SELECT COUNT(R8.`lca_edad`) FROM `localidad_casos` AS R8 WHERE R8.`lca_estado` NOT IN ('Fallecido', 'Fallecido No aplica No causa Directa', 'Recuperado') AND `lca_edad` BETWEEN 80 AND 89) AS '80-89', (SELECT COUNT(R9.`lca_edad`) FROM `localidad_casos` AS R9 WHERE R9.`lca_estado` NOT IN ('Fallecido', 'Fallecido No aplica No causa Directa', 'Recuperado') AND `lca_edad`>=90) AS '>=90'");
            $query->execute();
            $resultado = $this->get_result($query);
            $query->close();
            return $resultado;
        }

        public function getCovidBogotaAges($atencion) {
            $query = $this->getDb()->prepare("SELECT ? AS ATENCION, (SELECT COUNT(R0.`lca_edad`) FROM `localidad_casos` AS R0 WHERE R0.`lca_estado`=? AND `lca_edad` BETWEEN 0 AND 9) AS '0-9', (SELECT COUNT(R1.`lca_edad`) FROM `localidad_casos` AS R1 WHERE R1.`lca_estado`=? AND `lca_edad` BETWEEN 10 AND 19) AS '10-19', (SELECT COUNT(R2.`lca_edad`) FROM `localidad_casos` AS R2 WHERE R2.`lca_estado`=? AND `lca_edad` BETWEEN 20 AND 29) AS '20-29', (SELECT COUNT(R3.`lca_edad`) FROM `localidad_casos` AS R3 WHERE R3.`lca_estado`=? AND `lca_edad` BETWEEN 30 AND 39) AS '30-39', (SELECT COUNT(R4.`lca_edad`) FROM `localidad_casos` AS R4 WHERE R4.`lca_estado`=? AND `lca_edad` BETWEEN 40 AND 49) AS '40-49', (SELECT COUNT(R5.`lca_edad`) FROM `localidad_casos` AS R5 WHERE R5.`lca_estado`=? AND `lca_edad` BETWEEN 50 AND 59) AS '50-59', (SELECT COUNT(R6.`lca_edad`) FROM `localidad_casos` AS R6 WHERE R6.`lca_estado`=? AND `lca_edad` BETWEEN 60 AND 69) AS '60-69', (SELECT COUNT(R7.`lca_edad`) FROM `localidad_casos` AS R7 WHERE R7.`lca_estado`=? AND `lca_edad` BETWEEN 70 AND 79) AS '70-79', (SELECT COUNT(R8.`lca_edad`) FROM `localidad_casos` AS R8 WHERE R8.`lca_estado`=? AND `lca_edad` BETWEEN 80 AND 89) AS '80-89', (SELECT COUNT(R9.`lca_edad`) FROM `localidad_casos` AS R9 WHERE R9.`lca_estado`=? AND `lca_edad`>=90) AS '>=90'");
            $query->bind_param('sssssssssss', $atencion, $atencion, $atencion, $atencion, $atencion, $atencion, $atencion, $atencion, $atencion, $atencion, $atencion);
            $query->execute();
            $resultado = $this->get_result($query);
            $query->close();
            return $resultado;
        }

        public function insertTemporal($queryP) {
            $query = $this->getDb()->query($queryP);
            return $query;
        }

        public function insertCovid() {
            $stm = "INSERT INTO `covid_colombia`(`id`, `fecha_notificacion`, `codigo_municipio`, `atencion`, `edad`, `sexo`, `tipo`, `estado`, `pais_procedencia`, `fis`, `fecha_muerte`, `fecha_diagnostico`, `fecha_recuperado`, `fecha_reporte_web`, `tipo_recuperacion`) SELECT TEMP.`id`, TEMP.`fecha_notificacion`, TEMP.`codigo_municipio`, TEMP.`atencion`, TEMP.`edad`, TEMP.`sexo`, TEMP.`tipo`, TEMP.`estado`, TEMP.`pais_procedencia`, TEMP.`fis`, TEMP.`fecha_muerte`, TEMP.`fecha_diagnostico`, TEMP.`fecha_recuperado`, TEMP.`fecha_reporte_web`, TEMP.`tipo_recuperacion` FROM `casos_temporal` AS TEMP ON DUPLICATE KEY UPDATE `fecha_notificacion`=TEMP.`fecha_notificacion`, `codigo_municipio`=TEMP.`codigo_municipio`, `atencion`=TEMP.`atencion`, `edad`=TEMP.`edad`, `sexo`=TEMP.`sexo`, `tipo`=TEMP.`tipo`, `estado`=TEMP.`estado`, `pais_procedencia`=TEMP.`pais_procedencia`, `fis`=TEMP.`fis`, `fecha_muerte`=TEMP.`fecha_muerte`, `fecha_diagnostico`=TEMP.`fecha_diagnostico`, `fecha_recuperado`=TEMP.`fecha_recuperado`, `fecha_reporte_web`=TEMP.`fecha_reporte_web`, `tipo_recuperacion`=TEMP.`tipo_recuperacion`";
            $query = $this->getDb()->query($stm);
            return $query;
        }

        public function updateIdCountry() {
            $stm = "UPDATE `casos_temporal` AS TEMP LEFT JOIN `territorio` AS TER ON TEMP.`pais_procedencia`=TER.`ter_nombre` SET `pais_procedencia`=IF(TER.`id` IS NULL, 1, TER.`id`)";
            $query = $this->getDb()->query($stm);
            return $query;
        }

        public function updateIdCity() {
            $stm = "UPDATE `casos_temporal` AS TEMP LEFT JOIN `ciudadcol` AS CIU ON TEMP.`codigo_municipio`=CIU.`ciu_cod_dane` SET `codigo_municipio`=IF(CIU.`id` IS NULL, 1, CIU.`id`)";
            $query = $this->getDb()->query($stm);
            return $query;
        }

        public function deleteById($id) {
            $query = $this->getDb()->prepare("DELETE FROM ? WHERE id=?");
            $query->bind_param('ss', $this->getTable(), $id);
            return $query->execute();
        }

        public function deleteBy($column, $value) {
            $query = $this->getDb()->prepare("DELETE FROM ? WHERE ?=?");
            $query->bind_param('sss', $this->getTable(), $column, $value);
            return $query->execute();
        }

        public function truncateTable($table) {
            $stm = "TRUNCATE TABLE ".$table;
            $query = $this->getDb()->query($stm);
            return $query;
        }

    }
?>