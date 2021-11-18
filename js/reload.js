//Función para mostrar contenedor de carga
async function load(){
	var contenedor = document.getElementById('contenedor_load');
	contenedor.style.display = 'block';
}
//Función para quitar contenedor de carga
async function loadOff(){
	var contenedor = document.getElementById('contenedor_load');
	contenedor.style.display = 'none';
}