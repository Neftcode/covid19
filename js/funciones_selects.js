$(document).ready(function(){
   $("#proyecto").change(function () {
           $("#proyecto option:selected").each(function () {
            id=$(this).val();
            $.post("administrador_usuario_crear_procesar_perfil.php", { id: id }, function(data){
            $("#perfil_rrhh").html(data);
            });
        });
   })
});

$(document).ready(function(){
   $("#proyecto").change(function () {
           $("#proyecto option:selected").each(function () {
            id=$(this).val();
            $.post("administrador_usuario_crear_procesar_sede_laboral.php", { id: id }, function(data){
            $("#sede_laboral").html(data);
            });
        });
   })
});

$(document).ready(function(){
   $("#proyecto").change(function () {
           $("#proyecto option:selected").each(function () {
            id=$(this).val();
            $.post("administrador_usuario_crear_procesar_operacion.php", { id: id }, function(data){
            $("#operacion").html(data);
            });
        });
   })
});

$(document).ready(function(){
   $("#operacion").change(function () {
           $("#operacion option:selected").each(function () {
            id=$(this).val();
            var combo = document.getElementById("proyecto");
            var id_2 = combo.options[combo.selectedIndex].value;
            $.post("administrador_usuario_crear_procesar_area.php", { id:id, id_2:id_2 }, function(data){
            $("#area").html(data);
            });
        });
   })
});

$(document).ready(function(){
   $("#area").change(function () {
           $("#area option:selected").each(function () {
            id=$(this).val();
            var combo = document.getElementById("proyecto");
            var id_2 = combo.options[combo.selectedIndex].value;
            var combo_2 = document.getElementById("operacion");
            var id_3 = combo_2.options[combo_2.selectedIndex].value;
            $.post("administrador_usuario_crear_procesar_cargo.php", { id:id, id_2:id_2, id_3:id_3 }, function(data){
            $("#cargo").html(data);
            });
        });
   })
});

$(document).ready(function(){
   $("#motivo_atencion").change(function () {
           $("#motivo_atencion option:selected").each(function () {
            id=$(this).val();
            $.post("procesar_informe_diario_motivo.php", { id: id }, function(data){
            $("#detalle_atencion").html(data);
            });
        });
   })
});