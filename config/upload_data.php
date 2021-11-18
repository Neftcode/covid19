<?php
    error_reporting(E_ALL);
    require_once("../db/db.php");
    $entity_db->setTable("casos_temporal");
    # La longitud máxima de la línea del CSV. Si no la sabes,
    # ponla en 0 pero la lectura será un poco más lenta
    $longitudDeLinea = 1000;
    $delimitador = ","; # Separador de columnas
    $caracterCircundante = '"'; # A veces los valores son encerrados entre comillas
    $nombreArchivo = "../db/casos_covid19_nov2.csv"; #Ruta del archivo, en este caso está junto a este script
    # Abrir el archivo
    $gestor = fopen($nombreArchivo, "r");
    if (!$gestor) {
        exit ("No se puede abrir el archivo ".$nombreArchivo);
    }

    #  Comenzar a leer, $numeroDeFila es para llevar un índice
    $numeroDeFila = 1;
    $cant_insertados = 0;
    $query = "";
    $fecha_inicio = new DateTime();
    while (($fila = fgetcsv($gestor, $longitudDeLinea, $delimitador, $caracterCircundante)) !== false) {
        if ($numeroDeFila>1) {
            // foreach ($fila as $row) {
                // $arrayRow = explode(';', $row);
                // echo $numeroDeFila."<pre>";
                // print_r($fila);
                // echo "</pre><br>";
                $id = str_replace(",", "", $fila[1]);
                // echo $id."<br>";
                $fecha_notificacion = "";
                if ($fila[2]!="") {
                    $fecha_notificacion = explode(" ", $fila[2])[0];
                    $array = explode("/", $fecha_notificacion);
                    $fecha_notificacion = date("Y-m-d", strtotime($array[2] . "-" . $array[1] . "-" . $array[0]));
                }
                $codigo_municipio = str_replace(",", "", $fila[5]);
                $ciudad_ubicacion = $fila[6];
                $departamento_distrito = $fila[3];
                $atencion = $fila[15];
                $edad = $fila[7];
                $sexo = $fila[9];
                $tipo = $fila[10];
                $estado = $fila[11];
                $pais_procedencia = $fila[14];
                $fis = '';
                $fecha_muerte = "";
                if ($fila[17]!="") {
                    $fecha_muerte = explode(" ", $fila[17])[0];
                    $array = explode("/", $fecha_muerte);
                    $fecha_muerte = date("Y-m-d", strtotime($array[2] . "-" . $array[1] . "-" . $array[0]));
                }
                $fecha_diagnostico = "";
                if ($fila[18]!="") {
                    $fecha_diagnostico = explode(" ", $fila[18])[0];
                    $array = explode("/", $fecha_diagnostico);
                    $fecha_diagnostico = date("Y-m-d", strtotime($array[2] . "-" . $array[1] . "-" . $array[0]));
                }
                $fecha_recuperado = "";
                if ($fila[19]!="") {
                    $fecha_recuperado = explode(" ", $fila[19])[0];
                    $array = explode("/", $fecha_recuperado);
                    $fecha_recuperado = date("Y-m-d", strtotime($array[2] . "-" . $array[1] . "-" . $array[0]));
                }
                $fecha_reporte_web = "";
                if ($fila[0]!="") {
                    $fecha_reporte_web = explode(" ", $fila[0])[0];
                    $array = explode("/", $fecha_reporte_web);
                    $fecha_reporte_web = date("Y-m-d", strtotime($array[2] . "-" . $array[1] . "-" . $array[0]));
                }
                $tipo_recuperacion = $fila[20];
                // echo $id." | ".$fecha_notificacion." | ".$codigo_municipio." | ".$ciudad_ubicacion." | ".$departamento_distrito." | ".$atencion." | ".$edad." | ".$sexo." | ".$tipo." | ".$estado." | ".$pais_procedencia." | ".$fis." | ".$fecha_muerte." | ".$fecha_diagnostico." | ".$fecha_recuperado." | ".$fecha_reporte_web." | ".$tipo_recuperacion."<br>";
                // $query = "INSERT INTO `casos_temporal`(`id`, `fecha_notificacion`, `codigo_municipio`, `ciudad_ubicacion`, `departamento_distrito`, `atencion`, `edad`, `sexo`, `tipo`, `estado`, `pais_procedencia`, `fis`, `fecha_muerte`, `fecha_diagnostico`, `fecha_recuperado`, `fecha_reporte_web`, `tipo_recuperacion`) VALUES (".$id.", '".$fecha_notificacion."', ".$codigo_municipio.", '".$ciudad_ubicacion."', '".$departamento_distrito."', '".$atencion."', ".$edad.", '".$sexo."', '".$tipo."', '".$estado."', '".$pais_procedencia."', '".$fis."', '".$fecha_muerte."', '".$fecha_diagnostico."', '".$fecha_recuperado."', '".$fecha_reporte_web."', '".$tipo_recuperacion."');";
                $query = $entity_db->getDb()->prepare("INSERT INTO `casos_temporal`(`id`, `fecha_notificacion`, `codigo_municipio`, `ciudad_ubicacion`, `departamento_distrito`, `atencion`, `edad`, `sexo`, `tipo`, `estado`, `pais_procedencia`, `fis`, `fecha_muerte`, `fecha_diagnostico`, `fecha_recuperado`, `fecha_reporte_web`, `tipo_recuperacion`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                $query->bind_param('isisssissssssssss', $id, $fecha_notificacion, $codigo_municipio, $ciudad_ubicacion, $departamento_distrito, $atencion, $edad, $sexo, $tipo, $estado, $pais_procedencia, $fis, $fecha_muerte, $fecha_diagnostico, $fecha_recuperado, $fecha_reporte_web, $tipo_recuperacion);
                $query->execute();
                $afectados = $query->affected_rows;
                if ($afectados > 0) {
                    $cant_insertados++;
                } else {
                    echo $query."<br>";
                }
                $query->close();
            // }
            // if ($numeroDeFila==10) {
            //     break;
            // }
            # Ahora $fila es un arreglo. Podríamos acceder al precio de compra en $fila[1]
            # porque los índices de los arreglos comienzan en 0
            # Para separar la impresión
            // echo "<br><br>";
            # Aumentar el índice
        }
        $numeroDeFila++;
    }
    $fecha_fin = new DateTime();
    // Validar cantidad insertados
    if (($numeroDeFila-1)==$cant_insertados) {
        echo "Se insertaron todos los registros: ".$cant_insertados;
    } else {
        echo "NO se insertaron todos los registros: ".$cant_insertados." de ".($numeroDeFila-2);
    }
    $diff = $fecha_fin->diff($fecha_inicio);
    echo "<br><br>Total duración: ".$diff->h.':'.$diff->m.':'.$diff->s;
    # Al finar cerrar el gestor
    fclose($gestor);
?>