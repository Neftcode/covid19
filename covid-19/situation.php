<?php
    error_reporting(0);
    require_once("../db/db.php");
    $destino = $_GET["destino"];
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Colombia Siuation</title>
    <link rel="stylesheet" type="text/css" href="../css/hcColombiaSituation.css">

    <script type="text/javascript" src="../js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="../js/jquery-ui.js"></script>
    <!-- Highcharts -->
    <script type="text/javascript" src="../hc/js/highcharts.js"></script>
    <script type="text/javascript" src="../hc/js/highcharts-3d.js"></script>
    <!-- Exporting -->
    <script type="text/javascript" src="../hc/js/modules/exporting.js"></script>
    <script type="text/javascript" src="../hc/js/modules/accessibility.js"></script>
    <style type="text/css">
        ${demo.css}
    </style>
</head>
    <?php
        // Realizar consulta
        if ($destino=="Colombia") {
            $resultado = $entity_db->getCovidSituation();
        } elseif ($destino=="Bogotá") {
            $resultado = $entity_db->getCovidBogotaSituation();
        }
        $cantidad_resultado = count($resultado);
        // Matriz de casos por morbilidad, mortalidad y recuperados 
        $matrizCasos = [];
        $matrizCasos["Activos"] = 0;
        $matrizCasos["Muertos"] = 0;
        $matrizCasos["Recuperados"] = 0;
        for ($i=0; $i<$cantidad_resultado; $i++) {
            $situacion = $resultado[$i]["ATENCION"];
            $cantidad = intval($resultado[$i]["TOTAL"]);
            if ($situacion=="Fallecido"||$situacion=="Fallecido No aplica No causa Directa
            ") {
                $matrizCasos["Muertos"] = $cantidad;
            } elseif ($situacion=="Recuperado") {
                $matrizCasos["Recuperados"] = $cantidad;
            } else {
                $matrizCasos["Activos"] += $cantidad;
            }
        }
    ?>
<body>
    <div id="container"></div> 
    <script type="text/javascript">
        var matrizCasosJs = <?php echo json_encode($matrizCasos, JSON_UNESCAPED_UNICODE); ?>;//capturar matriz php en js
        var destino = "<?php echo $destino; ?>";
    </script>
    <script type="text/javascript" src="../js/sand-signika-theme.js"></script>
    <script src="../js/hcColombiaSituation.js"></script>
</body>
</html>