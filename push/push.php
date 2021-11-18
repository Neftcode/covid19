<script type="text/javascript">
/**
 * Hilos de ejecución para notificaciones push.js
 */
$(function() {
    if (!Push.Permission.has()) {
        Push.Permission.request("", "");
    }
    //variables
    var idUsuarioActual = "<?php echo $_SESSION['usu_id']; ?>";
    //Acceso a módulo Front Digital
    <?php if (in_array("CCST-Front Digital", $_SESSION['modulos_acceso'])): ?>;
        var perfilFrontDigital = "<?php echo $_SESSION['modulos_acceso_permisos'][array_search("CCST-Front Digital", $_SESSION['modulos_acceso'])][3]; ?>";
        var errorFroDig = 0;
        var intervalFroDig = setInterval(() => {
            if (Push.Permission.has()) {
                try {
                    $.ajax({
                        cache: false,
                        type: "GET",
                        dataType: "json",
                        url: "../front_digital/front_digital_seguimiento_ajax.php",
                        data: {"id_usuario": idUsuarioActual},
                        beforeSend: function() {},
                        success: function(resp) {
                            if (resp.respuesta=="done") {
                                if (resp.mensaje!="") {
                                    //Función para mostrar notificación push
                                    function sendPush(msg) {
                                        Push.create("Front Digital", {
                                            body: msg,
                                            icon: '../images/advertencia.png',
                                            requireInteraction: true,
                                            // timeout: 40000,
                                            onClick: function () {
                                                window.focus();
                                                this.close();
                                            }
                                        });
                                    }
                                    var array = resp.mensaje;
                                    var mensaje = "";
                                    var cont = 0;
                                    $.each(array, function (i, e) {
                                        cont++;
                                        mensaje += (cont==4 ? e : e+"\n\r");
                                        if (cont==4) {
                                            sendPush(mensaje)
                                            mensaje = "";
                                            cont = 0;
                                        }
                                    });
                                    if (mensaje!="") {
                                        sendPush(mensaje)
                                    }
                                }
                            } else {
                                errorFroDig++;
                                console.error("Error en la petición...");
                            }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            errorFroDig++;
                            if (XMLHttpRequest.status==404) {//página no encontrada
                                console.error("The page was not found...");
                            } else {//error del servidor (500)
                                console.error("Internal server error...");
                            }
                        }
                    });
                } catch (err) {
                    errorFroDig++;
                    console.error(err);
                }
                if (errorFroDig==3) clearInterval(intervalFroDig);
            }
        }, 48000);//48000
    <?php endif; ?>
});
</script>