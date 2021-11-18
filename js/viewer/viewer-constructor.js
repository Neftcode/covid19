/**
 * Constructores del Viewer.js, adaptado para las necesidades del desarrollador
 * @author Carlos Arévalo
 * @since 2019-05-07
 * @version 1.0
 * @lastModify 2019-05-09
 */

/**
 * Constante que contiene el constructor viewerJS para galeria e individuales como por ejemplo botón
 * @type {Object}
 */
const VIEWERJS = {
	viewerGallery: (
		/**
		 * Función para construir objeto Viewer galería
		 * Se utiliza para ver galería de imágenes impresas en el DOM
		 * @param  {String} selectorVG [String o tipo de elemento a asignar el Viewer]
		 * @param  {String} type       [Selector del selectorVG, puede ser clase o ID. Vacío cuando el selectorVG tiene la información suficiente]
		 * @return {Function}          [Retorna función viewerGallery para que pueda ser llamada]
		 */
		function viewerGallery(selectorVG=".viewer-gallery", type='') {
			var _selector = type=='#' ? document.querySelector('#'+selectorVG) : document.querySelectorAll(selectorVG);
			var items = Array();
			if (type=='#') {
				items.push(_selector);
			} else {
				for (var property in _selector) {
					if (_selector.hasOwnProperty(property)) {
						items.push(_selector[property]);
					}
				}
			}
			if (items.length>0) {
				/**
				 * Función que recorre cada elemento selector
				 * @param  {Object} e          [Elemento actual del DOM - cambia en cada iteración]
				 * @param  {Integer} i         [Contador de cantidad de veces que recorre la función .forEach()]
				 * @param  {Object} v          [Vector original de elementos del selector]
				 * @return {null}              [Sin retorno]
				 */
				items.forEach(function(e, i, v) {
					/**
					 * Constuctor del Viewer
					 * @param  {Object} e     		[Elemento actual del DOM - cambia en cada iteración del .forEach()]
					 * @param  {Object} options     [Parámetros del constructor de Viewer]
					 * @return {null}       		[Sin retorno]
					 */
					var viewer = new Viewer(e, {
						url: 'src',//Captura ruta de la imagen. Pred: data-original
						parent: true,
						viewer: true,
						title: true,//Muestra título
						toolbar: true,//Muestra barra de herramientas
						navbar: true,//Muestra navegación de imágenes
						button: true,//Muestra botón de salir
						canvas: true
					});
				});
			}
			/**
			 * Retornar función viewerGallery
			 */
			return {
				viewerGallery: viewerGallery
			}
		}
	)(),//fin de la función viewerGallery

	viewerImage: (
		/**
		 * Función para construir objeto Viewer individualmente
		 * Se utiliza para ver imágenes individualmente no impresas en el DOM
		 * @param  {String} selectorVI [String o tipo de elemento a asignar el Viewer]
		 * @param  {String} type       [Selector del selectorVI, puede ser clase o ID. Vacío cuando el selectorVI tiene la información suficiente]
		 * @return {Function}          [Retorna función viewerImage para que pueda ser llamada]
		 */
		function viewerImage(selectorVI=".viewer-image", type='') {
			var _selector = type=='#' ? document.querySelector('#'+selectorVI) : document.querySelectorAll(selectorVI);
			var items = Array();
			if (type=='#') {
				items.push(_selector);
			} else {
				for (var property in _selector) {
					if (_selector.hasOwnProperty(property)) {
						items.push(_selector[property]);
					}
				}
			}
			if (items.length>0) {
				/**
				 * Función que recorre cada elemento selector
				 * @param  {Object} e          [Elemento actual del DOM - cambia en cada iteración]
				 * @param  {Integer} i         [Contador de cantidad de veces que recorre la función .forEach()]
				 * @param  {Object} v          [Vector original de elementos del selector]
				 * @return {null}              [Sin retorno]
				 */
				items.forEach(function(e, i, v) {
					/**
					 * Data del elemento
					 * @type {Object}
					 */
					var data = e.dataset;
					/**
					 * Agregar escuchador al elemento del DOM
					 * @param  {String(Event)}	   [Tipo del evento]
					 * @param  {Function}	   	   [Función a ejecutar cuando se activa el evento]
					 * @return {null}      		   [Sin retorno]
					 */
					e.addEventListener("click", function () {
						var image = new Image();
						image.src = data.src;//agregar src del elemento a image
						image.alt = data.alt!=undefined ? data.alt : "Imagen";//agregar título
						/**
						 * Constuctor del Viewer
						 * @param  {Object} image  		[Imagen creada]
						 * @param  {Object} options     [Parámetros del constructor de Viewer]
						 * @return {null}       		[Sin retorno]
						 */
						var viewer = new Viewer(image, {
							parent: true,
							viewer: true,
							title: true,//Muestra título
							toolbar: true,//Muestra barra de herramientas
							navbar: true,//Muestra navegación de imágenes
							button: true,//Muestra botón de salir
							canvas: true,
							hidden: function () {
								viewer.destroy();//eliminar viewer al ocultarse
							},
						});
        				viewer.show();//mostrar imagen
        			});
				});
			}
			/**
			 * Retornar función viewerImage
			 */
			return {
				viewerImage: viewerImage
			}
		}
	)(),//fin de la función viewerImage

	viewerMultiple: (
		/**
		 * Función para construir objeto Viewer múltiple
		 * Se utiliza para ver galería de imágenes no impresas en el DOM
		 * @param  {String} selectorVM [String o tipo de elemento a asignar el Viewer]
		 * @param  {String} type       [Selector del selectorVM, puede ser clase o ID. Vacío cuando el selectorVM tiene la información suficiente]
		 * @return {Function}          [Retorna función viewerMultiple para que pueda ser llamada]
		 */
		function viewerMultiple(selectorVM=".viewer-multiple", type='') {
			var _selector = type=='#' ? document.querySelector('#'+selectorVM) : document.querySelectorAll(selectorVM);
			var items = Array();
			if (type=='#') {
				items.push(_selector);
			} else {
				for (var property in _selector) {
					if (_selector.hasOwnProperty(property)) {
						items.push(_selector[property]);
					}
				}
			}
			if (items.length>0) {
				/**
				 * Función que recorre cada elemento selector
				 * @param  {Object} e          [Elemento actual del DOM - cambia en cada iteración]
				 * @param  {Integer} i         [Contador de cantidad de veces que recorre la función .forEach()]
				 * @param  {Object} v          [Vector original de elementos del selector]
				 * @return {null}              [Sin retorno]
				 */
				items.forEach(function(e, i, v) {
					/**
					 * Data del elemento
					 * @type {Object}
					 */
					var data = e.dataset;
					var multiple = JSON.parse(decodeURIComponent(escape(atob(data.multiple))));//convertir string codificado a objeto JSON decodificado
					var viewerGallery = document.createElement("div");
					/**
					 * [description]
					 * @param  {[type]} element   [description]
					 * @param  {[type]} iteration [description]
					 * @param  {[type]} vector)   {						var   nodeLi [description]
					 * @return {[type]}           [description]
					 */
					multiple.forEach(function(element, iteration, vector) {//para cada propiedad (imagen a crear)
						var nodeLi = document.createElement("li");
						var nodeImage = document.createElement("img");
						nodeImage.src = element.src;//agregar src del elemento a image
						nodeImage.alt = element.alt!=undefined ? element.alt : "Imagen";//agregar título
						nodeLi.appendChild(nodeImage);
						viewerGallery.appendChild(nodeLi);//agregar nodo creado de lista e imagen al div
					});
					/**
					 * Agregar escuchador al elemento del DOM
					 * @param  {String(Event)}	   [Tipo del evento]
					 * @param  {Function}	   	   [Función a ejecutar cuando se activa el evento]
					 * @return {null}      		   [Sin retorno]
					 */
					e.addEventListener("click", function () {
						/**
						 * Constuctor del Viewer
						 * @param  {Object} viewerGallery  		[Div con imágenes a mostrar]
						 * @param  {Object} options     		[Parámetros del constructor de Viewer]
						 * @return {null}       				[Sin retorno]
						 */
						var viewer = new Viewer(viewerGallery, {
							parent: true,
							viewer: true,
							title: true,//Muestra título
							toolbar: true,//Muestra barra de herramientas
							navbar: true,//Muestra navegación de imágenes
							button: true,//Muestra botón de salir
							canvas: true,
							hidden: function () {
								viewer.destroy();//eliminar viewer al ocultarse
							},
						});
        				viewer.show();//mostrar imagen
        			});
				});
			}
			/**
			 * Retornar función viewerMultiple
			 */
			return {
				viewerMultiple: viewerMultiple
			}
		}
	)()//fin de la función viewerMultiple
};