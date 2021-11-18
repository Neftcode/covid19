/**
 * Clase para calcular festivos de Colombia. Utiliza librería Moment.js
 * Clase migrada y mejorada de PHP.
 * @author Carlos Arévalo
 * @since 2019-04-29
 * @version 1.0
 * @lastModify 2019-04-29
 */
class Festivos {
	/**
	 * Constructor de la clase Festivos
	 * @param  {String-Integer} anio [Recibe como parámetro el año a validar]
	 * @return {null}                [Sin retorno]
	 */
	constructor(anio='') {
		this.festivos = {};
		this.anio;
		this.pascua_mes;
		this.pascua_dia;
		this.hoy = moment().format("YYYY-MM-DD");
		
		if (anio=='') anio = moment().format("YYYY");
			
		this.anio = anio;

		this.pascua_mes = this.getEaster(this.anio)[0];
		this.pascua_dia = this.getEaster(this.anio)[1];

		this.festivos[anio]			= {};
		this.festivos[anio][1]		= {};
		this.festivos[anio][1][1]   = true;		// Primero de Enero
		this.festivos[anio][5]		= {};
		this.festivos[anio][5][1]   = true;		// Dia del Trabajo 1 de Mayo
		this.festivos[anio][7]		= {};
		this.festivos[anio][7][20]  = true;		// Independencia 20 de Julio
		this.festivos[anio][8]		= {};
		this.festivos[anio][8][7]   = true;		// Batalla de Boyacá 7 de Agosto
		this.festivos[anio][12]		= {};
		this.festivos[anio][12][8]  = true;		// Maria Inmaculada 8 diciembre (religiosa)
		this.festivos[anio][12][25] = true;		// Navidad 25 de diciembre

		this.calculateEmiliani(1, 6);			// Reyes Magos Enero 6
		this.calculateEmiliani(3, 19);			// San Jose Marzo 19
		this.calculateEmiliani(6, 29);			// San Pedro y San Pablo Junio 29
		this.calculateEmiliani(8, 15);			// Asunción Agosto 15
		this.calculateEmiliani(10, 12);			// Descubrimiento de América Oct 12
		this.calculateEmiliani(11, 1);			// Todos los santos Nov 1
		this.calculateEmiliani(11, 11);			// Independencia de Cartagena Nov 11

		//otras fechas calculadas a partir de la pascua.
		
		this.otherDatesCalculated(-3);			//jueves santo
		this.otherDatesCalculated(-2);			//viernes santo
		
		this.otherDatesCalculated(43, true);		//Ascención el Señor pascua
		this.otherDatesCalculated(60, true);		//Corpus Cristi
		this.otherDatesCalculated(68, true);		//Sagrado Corazón


		// otras fechas importantes que no son festivos

		// this.otherDatesCalculated(-46);		// Miércoles de Ceniza
		// this.otherDatesCalculated(-46);		// Miércoles de Ceniza
		// this.otherDatesCalculated(-48);		// Lunes de Carnaval Barranquilla
		// this.otherDatesCalculated(-47);		// Martes de Carnaval Barranquilla
	}

    /**
     * Función para calcular la medianoche (día) de Pascua de un año
     * @param  {String-Integer} year [Recibe como parámetro el año a validar]
     * @return {object}      		 [Retorna el mes y el día del día de pascua]
     */
    getEaster(year='') {
    	if (year=='') year = moment().format("YYYY");
    	if (typeof year === "string") year = parseInt(year);
        var f = Math.floor,
            // Golden Number - 1
            G = year % 19,
            C = f(year / 100),
            // related to Epact
            H = (C - f(C / 4) - f((8 * C + 13)/25) + 19 * G + 15) % 30,
            // number of days from 21 March to the Paschal full moon
            I = H - f(H/28) * (1 - f(29/(H + 1)) * f((21-G)/11)),
            // weekday for the Paschal full moon
            J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
            // number of days from 21 March to the Sunday on or before the Paschal full moon
            L = I - J,
            month = 3 + f((L + 40)/44),
            day = L + 28 - 31 * f(month / 4);
        return [month, day];
    }

    /**
     * Función que mueve una fecha diferente a lunes al siguiente lunes en el calendario y se aplica a fechas que estan bajo la ley emiliani global
     * @param  {Integer} mes_festivo [Mes en el que se va calcular]
     * @param  {Integer} dia_festivo [Día en el que se va calcular]
     * @return {null}             	 [Sin retorno]
     */
	calculateEmiliani(mes_festivo, dia_festivo) {
		var fechaFormato = moment(this.anio+'-'+mes_festivo+'-'+dia_festivo, "YYYY-M-D");
		var dd = parseInt(fechaFormato.format('d'));
		switch (dd) {
			case 0:                                    // Domingo
				fechaFormato.add(1, "day");
				break;
			case 2:                                    // Martes.
				fechaFormato.add(6, "day");
				break;
			case 3:                                    // Miércoles
				fechaFormato.add(5, "day");
				break;
			case 4:                                     // Jueves
				fechaFormato.add(4, "day");
				break;
			case 5:                                     // Viernes
				fechaFormato.add(3, "day");
				break;
			case 6:                                     // Sábado
				fechaFormato.add(2, "day");
				break;
		}
		var mes = parseInt(fechaFormato.format('M'));
		var dia = parseInt(fechaFormato.format('D'));
		if (!this.festivos[this.anio][mes]) {//validar si ya existe el mes
			this.festivos[this.anio][mes] = {};
		}
		this.festivos[this.anio][mes][dia] = true;
	}	

	/**
	 * Función que calcula otras fechas a partir de la pascua o fechas no festivas pero son importantes
	 * @param  {Number}  cantidadDias   [Cantidad de días a sumar o restar]
	 * @param  {Boolean} siguienteLunes [Si se debe calcular a partir de la pascua]
	 * @return {null}                   [Sin retorno]
	 */
	otherDatesCalculated(cantidadDias=0, siguienteLunes=false) {
		var fechaFormato = moment(this.anio+'-'+this.pascua_mes+'-'+this.pascua_dia, "YYYY-M-D").add(cantidadDias, 'day').format("YYYY-MM-DD");
		var mes_festivo = moment(fechaFormato, "YYYY-MM-D").format('M');
		var dia_festivo = moment(fechaFormato, "YYYY-MM-D").format('D');
		
		if (siguienteLunes) {
			this.calculateEmiliani(mes_festivo, dia_festivo);
		} else {
			if (!this.festivos[this.anio][mes_festivo]) {
				this.festivos[this.anio][mes_festivo] = {};
			}
			this.festivos[this.anio][mes_festivo][dia_festivo] = true;
		}
	}	

	/**
	 * Función para verificar si la fecha obtenida por parámetro es festiva (el año se pasa como parámetro en el constructor)
	 * @param  {Integer} dia [Día a validar]
	 * @param  {Integer} mes [Mes a validar]
	 * @return {Boolean}     [Retorna un booleano con la respuesta]
	 */
	esFestivo(dia, mes) {
		//validar que los parámetros no estén vacíos
		if (dia=='' || mes=='') {
			return false;
		}
		//validar que la fecha sea válida
		if (!moment(this.anio+'-'+mes+'-'+dia, "YYYY-MM-DD").isValid()) {
			console.error("Invalid date: "+this.anio+'-'+mes+'-'+dia);
			return false;
		}
		//validar si existe el mes en la matriz. Si existe validar si el día es festivo
		if (this.festivos[this.anio][mes]) {
			if (this.festivos[this.anio][mes][dia]) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}	
}