<footer>
	<div class="footer_contenido">
		<p>Gestión Técnica Oesía | &copy; Copyright 2017 by Oesía Networks Colombia S.A.S. Todos los derechos reservados.
		<?php 
			if (isset($_SESSION['usu_nombre_completo'])) {
				echo " | Bienvenido(a), ".$_SESSION['usu_nombre_completo'];
			}
		?>
		</p>
	</div>
</footer>