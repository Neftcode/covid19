<!DOCTYPE html>
<html lang="es">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Colombia</title>
    <link rel="stylesheet" type="text/css" href="../css/hmWorld.css">
    <link rel="stylesheet" type="text/css" href="../hm/css/jquery-ui.css">
    <link rel="stylesheet" type="text/css" href="../hm/css/font-awesome.css">
    <script type="text/javascript" src="../js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="../js/jquery-ui.js"></script>
    <script type="text/javascript" src="../hm/js/jquery-combobox.js"></script>
    <script type="text/javascript" src="../hm/code/highmaps.js"></script>
    <script type="text/javascript" src="../hm/code/mapdata/countries/co/co-all.js?1"></script>
    <!-- Exporting -->
    <script type="text/javascript" src="../hm/code/modules/exporting.js"></script>
    <script type="text/javascript" src="../hm/code/modules/offline-exporting.js"></script><!-- optional -->
    <script type="text/javascript" src="../hm/code/modules/export-data.js"></script><!-- optional -->
</head>
    <?php
        // Matriz de paises origen con identificador iso-a3
        $matrizPaises = [];
        $matrizPaises["COL"] = 25000;
        $matrizPaises["USA"] = 136798;
        $matrizPaises["RUS"] = 312354;
        $matrizPaises["BOL"] = 456;
    ?>
<body>
    <div id="demo-wrapper">
        <div id="mapBox">
            <div id="up"></div>
            <div class="selector" style="display: none;">
                <button id="btn-prev-map" class="prev-next"><i class="fa fa-angle-left"></i></button>
                <select id="mapDropdown" class="ui-widget combobox"></select>
                <button id="btn-next-map" class="prev-next"><i class="fa fa-angle-right"></i></button>
            </div>
            <div id="container"></div> 
        </div>
    </div>
    <script type="text/javascript">
        var matrizPaisesJs = <?php echo json_encode($matrizPaises, JSON_UNESCAPED_UNICODE); ?>;//capturar matriz php en js
    </script>
    <script src="../js/hmColombia.js"></script>
</body>
</html>