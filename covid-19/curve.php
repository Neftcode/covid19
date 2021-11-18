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
    <title>Colombia Curve</title>
    <link rel="stylesheet" type="text/css" href="../css/hcColombiaCurve.css">

    <script type="text/javascript" src="../js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="../js/jquery-ui.js"></script>
    <script type="text/javascript" src="../js/moment.min.js"></script>
    <script type="text/javascript" src="../js/moment-timezone.min.js"></script>
    <script type="text/javascript" src="../js/jdate.js"></script>
    <!-- Highcharts -->
    <script type="text/javascript" src="../hc/js/highcharts.js"></script>
    <script type="text/javascript" src="../hc/js/modules/data.js"></script>
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
            $resultado = $entity_db->getCovidCurve();
        } elseif ($destino=="Bogotá") {
            $resultado = $entity_db->getCovidBogotaCurve();
        }
        $cantidad_resultado = count($resultado);
        // Matriz de casos diarios
        $matrizCurva = [];
        for ($i=0; $i<$cantidad_resultado; $i++) {
            $matrizCurva[] = [intval($resultado[$i]["UNIX"]), intval($resultado[$i]["CANTIDAD"])];
        }
    ?>
<body>
    <div id="container"></div> 
    <script type="text/javascript">
        var matrizCurvaJs = <?php echo json_encode($matrizCurva, JSON_UNESCAPED_UNICODE); ?>;//capturar matriz php en js
        var destino = "<?php echo $destino; ?>";
    </script>
    <script type="text/javascript" src="../js/sand-signika-theme.js"></script>
    <script src="../js/hcColombiaCurve.js"></script>
</body>
</html>