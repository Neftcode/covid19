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
    <title>Colombia Gender</title>
    <link rel="stylesheet" type="text/css" href="../css/hcColombiaGender.css">

    <script type="text/javascript" src="../js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="../js/jquery-ui.js"></script>
    <!-- Highcharts -->
    <script type="text/javascript" src="../hc/js/highcharts.js"></script>
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
            $resultado = $entity_db->getCovidGender();
        } elseif ($destino=="Bogotá") {
            $resultado = $entity_db->getCovidBogotaGender();
        }
        $cantidad_resultado = count($resultado);
        // Matriz de casos por género
        $matrizGenero = [];
        for ($i=0; $i<$cantidad_resultado; $i++) {
            $matrizGenero[$resultado[$i]["GENERO"]]["ACTIVOS"] = intval($resultado[$i]["ACTIVOS"]);
            $matrizGenero[$resultado[$i]["GENERO"]]["MUERTOS"] = intval($resultado[$i]["MUERTOS"]);
            $matrizGenero[$resultado[$i]["GENERO"]]["RECUPERADOS"] = intval($resultado[$i]["RECUPERADOS"]);
            $matrizGenero[$resultado[$i]["GENERO"]]["TOTAL"] = intval($resultado[$i]["CANTIDAD"]);
        }
    ?>
<body>
    <div id="container"></div> 
    <script type="text/javascript">
        var matrizGeneroJs = <?php echo json_encode($matrizGenero, JSON_UNESCAPED_UNICODE); ?>;//capturar matriz php en js
        var destino = "<?php echo $destino; ?>";
    </script>
    <script type="text/javascript" src="../js/sand-signika-theme.js"></script>
    <script src="../js/hcColombiaGender.js"></script>
</body>
</html>