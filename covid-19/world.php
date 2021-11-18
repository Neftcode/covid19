<?php
    error_reporting(0);
    require_once("../db/db.php");
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>World</title>
    <link rel="stylesheet" type="text/css" href="../css/hmWorld.css">
    <link rel="stylesheet" type="text/css" href="../hm/css/flags32.css">

    <script type="text/javascript" src="../js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="../js/jquery-ui.js"></script>
    <!-- Highmaps -->
    <script type="text/javascript" src="../hm/code/highmaps.js"></script>
    <script type="text/javascript" src="../hm/code/modules/data.js"></script>
    <script type="text/javascript" src="../hm/code/mapdata/custom/world.js"></script>
    <!-- Exporting -->
    <script type="text/javascript" src="../hm/code/modules/exporting.js"></script>
    <script type="text/javascript" src="../hm/code/modules/offline-exporting.js"></script><!-- optional -->
</head>
    <?php
        // Realizar consulta
        $resultado = $entity_db->getCovidCountries();
        $totalCasos = 0;
        // Matriz de paises origen con identificador iso-a3
        $matrizPaises = [];
        for ($i=0; $i<count($resultado); $i++) {
            $pais = $resultado[$i]["ISO"];
            $cantidad = intval($resultado[$i]["CANTIDAD"]);
            if ($pais!=""&&$pais!="COL") {
                $matrizPaises[$pais] = $cantidad;
                $totalCasos += $cantidad;
            }
        }
    ?>
<body>
    <div id="container"></div> 
    <script type="text/javascript">
        var matrizPaisesJs = <?php echo json_encode($matrizPaises, JSON_UNESCAPED_UNICODE); ?>;//capturar matriz php en js
        var totalCasos = <?php echo $totalCasos; ?>;
    </script>
    <script type="text/javascript" src="../js/sand-signika-theme.js"></script>
    <script src="../js/hmWorld.js"></script>
</body>
</html>