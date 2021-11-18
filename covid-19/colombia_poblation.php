<?php
    error_reporting(0);
    require_once("../db/db.php");
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Colombia Poblation</title>
    <link rel="stylesheet" type="text/css" href="../css/hmColombiaPoblation.css">

    <script type="text/javascript" src="../js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="../js/jquery-ui.js"></script>
    <!-- Highmaps -->
    <script type="text/javascript" src="../hm/code/highmaps.js"></script>
    <script type="text/javascript" src="../hm/code/mapdata/countries/co/co-all.js"></script>
    <!-- Exporting -->
    <script type="text/javascript" src="../hm/code/modules/exporting.js"></script>
    <script type="text/javascript" src="../hm/code/modules/offline-exporting.js"></script><!-- optional -->
</head>
    <?php
        // Realizar consulta
        $resultado = $entity_db->getCovidColombia();
        $cantidad_resultado = count($resultado);
        $matrizDepartamentos = [];
        $totalCasos = 0;
        for ($i=0; $i<$cantidad_resultado; $i++) {
            $depto = $resultado[$i]["ID_DANE"];
            $cantidad = intval($resultado[$i]["CANTIDAD"]);
            $matrizDepartamentos["co-".$depto] = $cantidad;
            $totalCasos += $cantidad;
        }
    ?>
<body>
    <div id="container"></div> 
    <script type="text/javascript">
        var matrizDepartamentosJs = <?php echo json_encode($matrizDepartamentos, JSON_UNESCAPED_UNICODE); ?>;//capturar matriz php en js
        var totalCasos = <?php echo $totalCasos; ?>
    </script>
    <script type="text/javascript" src="../js/sand-signika-theme.js"></script>
    <script src="../js/hmColombiaPoblation.js"></script>
</body>
</html>