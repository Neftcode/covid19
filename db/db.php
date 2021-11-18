<?php
    require_once("../db/Connect.php");
    require_once("../db/Entity.php");
    $entity_db = new Entity("", (new Connect("nfcovid"))->connect());
?>