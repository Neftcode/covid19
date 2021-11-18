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
    <title>Colombia Ages</title>
    <link rel="stylesheet" type="text/css" href="../css/hcColombiaAges.css">

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
        $matrizEdades = [];
        // Matriz de casos por edades
        $matrizEdades["Activos"] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $matrizEdades["Muertos"] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $matrizEdades["Recuperados"] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $resultado = [];
        // Realizar consulta
        if ($destino=="Colombia") {
            $resultado[] = $entity_db->getCovidAgesActive()[0];
            $resultado[] = $entity_db->getCovidAges("Fallecido")[0];
            $resultado[] = $entity_db->getCovidAges("Recuperado")[0];
        } elseif ($destino=="Bogotá") {
            $resultado[] = $entity_db->getCovidBogotaAgesActive()[0];
            $resultado[] = $entity_db->getCovidBogotaAgesDeath()[0];
            $resultado[] = $entity_db->getCovidBogotaAges("Recuperado")[0];
        }
        $cantidad_resultado = count($resultado);
        for ($i=0; $i<$cantidad_resultado; $i++) {
            $atencion = $resultado[$i]["ATENCION"];
            $r0a9 = $resultado[$i]["0-9"];
            $r10a19 = $resultado[$i]["10-19"];
            $r20a29 = $resultado[$i]["20-29"];
            $r30a39 = $resultado[$i]["30-39"];
            $r40a49 = $resultado[$i]["40-49"];
            $r50a59 = $resultado[$i]["50-59"];
            $r60a69 = $resultado[$i]["60-69"];
            $r70a79 = $resultado[$i]["70-79"];
            $r80a89 = $resultado[$i]["80-89"];
            $r90 = $resultado[$i][">=90"];
            if ($atencion=="Activos") {
                $matrizEdades["Activos"] = [$r0a9, $r10a19, $r20a29, $r30a39, $r40a49, $r50a59, $r60a69, $r70a79, $r80a89, $r90];
            } elseif ($atencion=="Fallecido") {
                $matrizEdades["Muertos"] = [$r0a9, $r10a19, $r20a29, $r30a39, $r40a49, $r50a59, $r60a69, $r70a79, $r80a89, $r90];
            } else {
                $matrizEdades["Recuperados"] = [$r0a9, $r10a19, $r20a29, $r30a39, $r40a49, $r50a59, $r60a69, $r70a79, $r80a89, $r90];
            }
        }
    ?>
<body>
    <div id="container"></div> 
    <script type="text/javascript">
        var matrizEdadesJs = <?php echo json_encode($matrizEdades, JSON_UNESCAPED_UNICODE); ?>;//capturar matriz php en js
        var destino = "<?php echo $destino; ?>";
    </script>
    <script type="text/javascript" src="../js/sand-signika-theme.js"></script>
    <script src="../js/hcColombiaAges.js"></script>
</body>
</html>