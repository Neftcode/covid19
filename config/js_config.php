<script type="text/javascript" src="../20js/jquery-3.4.1.min.js"></script>
<script type="text/javascript" src="../20js/popper.min.js"></script>
<script type="text/javascript" src="../20js/bootstrap.min.js"></script>
<script type="text/javascript" src="../20js/menu-abrir.js"></script>
<script type="text/javascript">
	//Función para cancelar operación
    function guardar_cancelar() {
      alertify.confirm("¿Está seguro de que desea cancelar la operación?", "¡Toda la información que no haya sido guardada se perderá!", function() {
        location.href = "<?php echo $ruta_cancelar_finalizar; ?>";
      }, '');
    }

</script>