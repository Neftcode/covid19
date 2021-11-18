<?php
    error_reporting(E_ALL);
    require_once("../db/db.php");
    echo "Actualización de id de países...<br>";
    $entity_db->updateIdCountry();
    echo "Actualización de id de ciudades...<br>";
    $entity_db->updateIdCity();
    echo "Inserción a la tabla producción...<br>";
    $entity_db->insertCovid();
    echo "Truncar tabla temporal...<br>";
    $entity_db->truncateTable("`casos_temporal`");
