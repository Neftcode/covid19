<?php
    session_start();
    error_reporting(0);
    //Si sesion esta iniciada se redirige al contenido, sino muestra index de logueo//
    if(!isset($_SESSION["usu_id"])){
        header("Location:../index.php");
    } 
    else {
        if (in_array("Control Turnos-Vacaciones", $_SESSION['modulos_acceso'])) {
            require_once("../conexion_configuracion.php");
            require_once("../PHPfpdf/fpdf.php");

            define("NIT", "830.135.305");
            define("NOMBREEMPRESA", "Colombia Telecomunicaciones SA ESP");
            $columnaNombre          = "Jonathan Alexander Maldonado Rodriguez";
            $columnaCedula          = "1015429736";
            $columnaTelefono        = "3168677883";
            $columnaTipoContrato    = "Contrato Cliente";
            $columnaSolicitud       = "0123456789";
            /*
            *Datos de la tabla
            */
            // Títulos de las columnas
            $header = ["Nombre", "Cédula", "Teléfono", "Tipo Documento", "Solicitud"];
            // Datos fila
            $data = [$columnaNombre, $columnaCedula, $columnaTelefono, $columnaTipoContrato, $columnaSolicitud];

            class PDF extends FPDF{
                function Header() {
                    // Salto de línea
                    $this->Ln(40);
                    // Logo
                    //Image('../ruta',poX,posY,Width,Heigth);
                    $this->Image('../images/logo2.png',30,22,36,22);
                    $this->Ln(10);
                    // Arial bold 15
                    $this->SetFont('Arial','B',18);
                    $this->Cell(0,10,utf8_decode('CERTIFICACIÓN'),0,0,'C');
                    // Salto de línea
                    $this->Ln(30);
                }
                function introduction() {
                    // $this->Line(10,72,206,72);//ancho de margen a margen
                    // $this->Line(10,88,175,88);//ancho de MultiCell
                    $this->SetFont('Arial','',12);
                    //Corro hacia la derecha
                    $this->Cell(20);
                    $this->MultiCell(155,5.5,utf8_decode('OESIA SA identificado con NIT '.NIT.', certifica que en nuestras bases de datos y en el archivo físico que administramos para '.NOMBREEMPRESA.', a la fecha de emisión de esta certificación, en las instalaciones de custodia no reposan los contratos o (documento solicitado) relacionados a continuación:'),0,'J');
                    // Salto de línea
                    $this->Ln(20);
                }
                function table($header, $data) {
                    $this->Cell(7);
                    // Cabecera
                    $this->SetFont('Arial','B',10);
                    $this->Cell(76,7,utf8_decode($header[0]),1,0,'C');
                    $this->Cell(25,7,utf8_decode($header[1]),1,0,'C');
                    $this->Cell(25,7,utf8_decode($header[2]),1,0,'C');
                    $this->Cell(35,7,utf8_decode($header[3]),1,0,'C');
                    $this->Cell(25,7,utf8_decode($header[4]),1,0,'C');
                    // Datos
                    $this->Ln();
                    $this->Cell(7);
                    $this->SetFont('Arial','',9);
                    $this->Cell(76,7,utf8_decode($data[0]),1,0,'C');
                    $this->Cell(25,7,utf8_decode($data[1]),1,0,'C');
                    $this->Cell(25,7,utf8_decode($data[2]),1,0,'C');
                    $this->Cell(35,7,utf8_decode($data[3]),1,0,'C');
                    $this->Cell(25,7,utf8_decode($data[4]),1,0,'C');
                    // Salto de línea
                    $this->Ln(25);
                }
                function emitedDate() {
                    $this->SetFont('Arial','',12);
                    $this->Cell(20);
                    $this->Cell(80,7,'Emitida el: '.date('d/m/Y'));
                    // Salto de línea
                    $this->Ln(50);
                }
                function fima() {
                    // fima
                    $this->Image('../images/logo2.png',43,196,36,22);
                    $this->Cell(20);
                    $this->Cell(65,0,'',1);
                    $this->Ln();
                    $this->Cell(19);
                    $this->SetFont('Arial','B',12);
                    $this->Cell(65,8,'Coordinador Proyecto');
                }
            }
            $nombreArchivo = "ArchivoPdf";//Nombre o ruta del archivo
            $pdf = new PDF('P','mm','Letter');
            $pdf->SetCreator('Oesía Group | Outsourcing IV', true);
            $pdf->SetAuthor('Oesía Group | Outsourcing IV', true);
            $pdf->SetKeywords('Solicitud de vacaciones');
            $pdf->SetTitle('Solicitud de vacaciones');
            $pdf->SetSubject('Solicitud de vacaciones');
            //Definir márgenes L,U,R
            // $pdf->SetMargins(10,10,10);
            $pdf->SetFont('Arial','B',12);
            $pdf->AddPage();
            $pdf->introduction();
            $pdf->table($header, $data);
            $pdf->emitedDate();
            $pdf->fima();
            /*
            *Output()
            *@param dest
            *@param name
            *@param UTF8 (only in dest I or D)
            *
            *dest -> 
                I: envía el fichero al navegador de forma que se usa la extensión (plug in) si está disponible.
                D: envía el fichero al navegador y fuerza la descarga del fichero con el nombre especificado por name.
                F: guarda el fichero en un fichero local de nombre name.
                S: devuelve el documento como una cadena.
            */
            $pdf->Output('F',$nombreArchivo.'.pdf', true);
            $pdf->Close();
        } else{
            include("../permisodenegado.php");
        }
    }
?>