<?php
    session_start();
    error_reporting(0);
    require_once("conexion_configuracion_index.php");
    //Si sesion esta iniciada se redirige al contenido, sino muestra index de logueo//
    if (isset($_SESSION["usu_id"]) AND $_SESSION['usu_inicio_sesion']!=0){
        header("Location:contenido.php");
    } else {
        unset($_SESSION['estatus_crear_cuenta']);

        //validaciones de seguridad
        function validar_input($variable) {
          $variable = trim($variable);
          $variable = strip_tags($variable);
          $variable = htmlspecialchars($variable);
          return $variable;
        }

        function validar_output($variable) {
          $variable = htmlspecialchars($variable);
          return $variable;
        }

        if(isset($_POST["login"])){
            //obtiene variable de captcha
            $captcha_validacion = validar_input($_POST['captcha_validacion']);
            // $captcha_original = $_COOKIE['captcha'];
            //obtiene variable usuario y contraseña
            $username=validar_input($_POST['username']);
            $password=validar_input($_POST['password']);
            
            //valida el captcha correcto
            //if ($captcha_original == sha1($captcha_validacion)) {
                $sentencia = $enlace_db_configuracion->prepare("SELECT `usu_id`, `usu_acceso`, `usu_contrasena`, `usu_nombres`, `usu_apellidos`, `usu_control_logueo`, `usu_estado_usuario`, `usu_inicio_sesion`, `td_proyecto`.`pro_nombre`, `tb_operacion_proyecto`.`ope_nombre_operacion`, `tb_operacion_proyecto`.`ope_nombre_area`, `td_proyecto`.`pro_id`, `usu_fecha_nacimiento`, `td_proyecto`.`pro_db` FROM `tb_usuario` LEFT JOIN `tb_arl_usuario` ON `tb_usuario`.`usu_arl`=`tb_arl_usuario`.`arl_id` LEFT JOIN `tb_eps_usuario` ON `tb_usuario`.`usu_eps`=`tb_eps_usuario`.`eps_id` LEFT JOIN`tb_fondo_pensiones_usuario`  ON `tb_usuario`.`usu_fondo_pensiones`=`tb_fondo_pensiones_usuario`.`fpe_id` LEFT JOIN `tb_horario_usuario` ON `tb_usuario`.`usu_horario`=`tb_horario_usuario`.`hor_id` LEFT JOIN `tb_perfil_rrhh_proyecto` ON `tb_usuario`.`usu_perfil_rrhh`=`tb_perfil_rrhh_proyecto`.`per_id` LEFT JOIN `tb_plan_celular_usuario` ON `tb_usuario`.`usu_plan_celular`=`tb_plan_celular_usuario`.`pce_id` LEFT JOIN `tb_sede_proyecto` ON `tb_usuario`.`usu_sede_laboral`=`tb_sede_proyecto`.`sed_id` LEFT JOIN `tb_tipo_contrato_usuario` ON `tb_usuario`.`usu_tipo_contrato`=`tb_tipo_contrato_usuario`.`tco_id` LEFT JOIN `td_proyecto` ON `tb_sede_proyecto`.`sed_proyecto`=`td_proyecto`.`pro_id` LEFT JOIN `tb_operacion_proyecto` ON `tb_usuario`.`usu_cargo`=`tb_operacion_proyecto`.`ope_id` WHERE `tb_usuario`.`usu_acceso`=?");
                $sentencia->bind_param('s', $username);
            
                //ejecutar y obtener
                $sentencia->execute();
                $sentencia->bind_result($usu_id, $usu_acceso, $usu_contrasena, $usu_nombres, $usu_apellidos, $usu_control_logueo, $usu_estado_usuario, $usu_inicio_sesion, $pro_nombre, $ope_nombre_operacion, $ope_nombre_area, $pro_id, $usu_fecha_nacimiento, $pro_db);

                $i=0;
                while ($sentencia->fetch()) {
                    $resultado_registros[$i][]=$usu_id;
                    $resultado_registros[$i][]=$usu_acceso;
                    $resultado_registros[$i][]=$usu_contrasena;
                    $resultado_registros[$i][]=$usu_nombres;
                    $resultado_registros[$i][]=$usu_apellidos;
                    $resultado_registros[$i][]=$usu_control_logueo;
                    $resultado_registros[$i][]=$usu_estado_usuario;
                    $resultado_registros[$i][]=$usu_inicio_sesion;
                    $resultado_registros[$i][]=$pro_nombre;
                    $resultado_registros[$i][]=$ope_nombre_operacion;
                    $resultado_registros[$i][]=$ope_nombre_area;
                    $resultado_registros[$i][]=$pro_id;
                    $resultado_registros[$i][]=$usu_fecha_nacimiento;
                    $resultado_registros[$i][]=$pro_db;
                    $i++;
                }
                
                $campos_afectados = count($resultado_registros);
                if ($campos_afectados>0) {
                    if($username==$resultado_registros[0][1] AND $resultado_registros[0][6]=='Activo' AND crypt($password, $resultado_registros[0][2]) == $resultado_registros[0][2]){
                        $_SESSION['usu_id']=$resultado_registros[0][0];
                        $_SESSION['usu_acceso']=$resultado_registros[0][1];
                        $_SESSION['usu_nombre_completo']=$resultado_registros[0][3]." ".$resultado_registros[0][4];
                        $_SESSION['usu_estado_usuario']=$resultado_registros[0][6];
                        $_SESSION['usu_inicio_sesion']=$resultado_registros[0][7];
                        $_SESSION['usu_control_logueo']=$resultado_registros[0][5];
                        $_SESSION['pro_id']=$resultado_registros[0][11];
                        $_SESSION['pro_nombre']=$resultado_registros[0][8];
                        $_SESSION['pro_db']=$resultado_registros[0][13];
                        $_SESSION['ope_nombre_operacion']=$resultado_registros[0][9];
                        $_SESSION['ope_nombre_area']=$resultado_registros[0][10];
                        $_SESSION['usu_fecha_nacimiento']=$resultado_registros[0][12];
                        
                        // $Consulta_logueo = mysqli_query($enlace_db, "SELECT `cot_id` FROM `tb_control_turno` WHERE `cot_usuario`='".$resultado_registros[0][0]."' AND `cot_logueo_inicial` LIKE '".date('Y-m-d')."%'");
                        // $Resultado_logueo = mysqli_fetch_all($Consulta_logueo);
                        // $campos_afectados_logueo = count($Resultado_logueo);
                        
                        if ($resultado_registros[0][7]==0) {
                            header("Location: config_seguridad.php");
                        } else {
                            header("Location: contenido.php");
                        }
                    } else {
                        $message_error = "Inicio de sesión fallido, verifique e intente nuevamente!";
                    }
                // } else {
                //     $message_error = "Inicio de sesión fallido, verifique e intente nuevamente!";
                // }
            } else {
                $message_error = "Inicio de sesión fallido, verifique e intente nuevamente!";
            }
        }
?>
<!DOCTYPE html>
<html lang="ES">
    <head>
        <title></title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximun-scale=1, minimun-scale=1">
        <script src="js/fontawesome-all.js"></script>
        <link rel="stylesheet" type="text/css" href="css/style.css">

    </head>
    <body>
        <div class="contenido">
            <div class="menu-bar"><a href="index.php" class="home"><img src="images/logo.png" class="logo_home"></a><p class="titulo_header">Gestión Técnica Oesía</p></div>
            <div class="login">
                <div class="login_left">
                    <p class="titulo_login">Iniciar sesión</p>
                    <form name="iniciosesion" action="" method="POST">
                        <div class="login_user">
                            <div class="login_logo">
                                <span class="fas fa-user"></span>
                            </div>
                            <div class="login_input">
                                <input type="text" autocomplete="off" placeholder="Usuario" maxlength="50" name="username" value="<?php if(isset($_POST["login"])){ echo validar_output($username); } ?>" required autofocus>
                            </div>
                        </div>
                        <div class="login_pass">
                            <div class="login_logo">
                                <span class="fas fa-key"></span>
                            </div>
                            <div class="login_input">
                                <input type="password" autocomplete="off" maxlength="15" placeholder="Contraseña" name="password" required>
                            </div>
                        </div>
                        <div class="login_captcha" style="float: left;">
                            <div class="login_logo">
                                <span class="fas fa-qrcode"></span>
                            </div>
                            <div class="login_input_captcha">
                                <input type="text" autocomplete="off" placeholder="Escriba los caracteres de la imagen" name="captcha_validacion" maxlength="5" required>
                            </div>
                        </div>
                        <div class="imagen_captcha">
                            <img src="captcha_imagen.php" title="Código aleatorio">
                        </div>
                        <div class="login_olvido_contraseña">
                            <a href="registrar_cuenta.php"><span class="fas fa-user-plus"></span> ¿Registrar una cuenta?</a>
                            <a href="#"> | </a>
                            <a href="#"><span class="fas fa-lock"></span> ¿Has olvidado tu contraseña?</a>
                            <!-- <a href="revovery_password.php"><span class="icon-lock"></span>¿Has olvidado tu contraseña?</a> -->
                        </div>
                        <div class="login_boton">
                            <input type="submit" name="login" value="Iniciar sesión">
                        </div>
                        <br>
                        <?php if (!empty($message_error)) {echo "<p class='mensaje_error'>".$message_error."</p>";} ?>
                        <br>
                    </form>
                    <p class="login_titulo_aviso">Tu cuenta es tan segura como lo es tu PC.</p>
                    <p class="login_aviso">No escribas tu contraseña en un dispositivo en el que no confíes plenamente.<br>No ingreses a tu cuenta desde un ordenador público o compartido.</p>
                    <br>
                </div>
                <div class="login_right">
                    <p class="login_titulo_oesia">Objetivo:</p>
                    <p class="login_aviso_oesia">Consolidarse como Impulsador Global de la Innovación.</p>
                    <br>
                    <p class="login_titulo_oesia">Visión de Futuro:</p>
                    <ul>
                        <li><p class="login_aviso_oesia">Vinculada a nuestros clientes</p></li>
                        <li><p class="login_aviso_oesia">Vinculada a nuestros profesionales</p></li>
                        <li><p class="login_aviso_oesia">Vinculada al conjunto de la Sociedad</p></li>
                    </ul>
                    <br>
                    <p class="login_titulo_oesia">Valores:</p>
                    <ul>
                        <li><p class="login_aviso_oesia">Compromiso (Perseverancia, Excelencia, Superación)</p></li>
                        <li><p class="login_aviso_oesia">Confianza (Ilusión, Positividad, Conocimiento)</p></li>
                        <li><p class="login_aviso_oesia">Transparencia (Claridad, Responsabilidad)</p></li>
                        <li><p class="login_aviso_oesia">Liderazgo (Innovación, Creatividad, Anticipación)</p></li>
                    </ul>
                    <br>
                    <br>
                    <br>
                </div>

            </div>

            <footer>
                <?php
                    include("footer.php");
                ?>
            </footer>
        </div>
    </body>
</html>
<?php
    }
?>