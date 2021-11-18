/**
 * Funciones Datepicker ajustadas a las necesidades del programador. Utiliza librería Moment.js
 * Tipos: datetimelocal, daterange, dateweek, datemonth
 * @author Carlos Arévalo
 * @since 2018-10-01
 * @version 2.0
 * @lastModify 2019-07-22
 */

/**
 * Constante que contiene los datepickers
 * @type {Object}
 */
const DATEPICKER = {
    datetimelocal: (
        /**
         * Función para ejecutar datepicker de tipo local [datetimelocal]
         * @param  {String} selectorDTL [Tipo de elemento para aplicar el datepicker]
         * @return {Function}           [Retorna funciones datetimelocal y datetimelocalValidar para que puedan ser llamadas]
         */
        function datetimelocal(selectorDTL=".datetime-local") {
            /**
             * Función que recorre cada elemento selector
             * @param  {Integer} i  [Contador de cantidad de veces que recorre la función .each()]
             * @param  {Object} e   [Elemento actual del DOM - cambia en cada iteración]
             * @return {null}       [Sin retorno]
             */
            $(selectorDTL).each(function(i, e) {
                var actual_object = $(this);
                var id_object = $("#"+actual_object.attr("id"));
                var verificar_valor = 0;
                //Validar si es timepicker y es formato con segundos
                var formato = "YYYY-MM-DD";
                var attrTime = false;
                var attrSeconds = false;
                if ($(this).attr("time")=="true") {
                    attrTime = true;
                    formato = "YYYY-MM-DD HH:mm";
                    if ($(this).attr("seconds")=="true") {
                        attrSeconds = true;
                        formato = "YYYY-MM-DD HH:mm:ss";
                    }
                }
                //Validar fecha inicio
                if ($(this).val()!="") {
                    var startDate = Object.values(moment($(this).val().trim(), formato))[6];
                    verificar_valor++;
                } else {
                    var startDate = Object.values(moment(moment().format(formato), formato))[6];
                }
                //Validar atributos min, max
                var attrMinDate = false;
                var attrMaxDate = false;
                if ($(this).attr("mindate")) attrMinDate = Object.values(moment($(this).attr("mindate").trim(), formato))[6];
                if ($(this).attr("maxdate")) attrMaxDate = Object.values(moment($(this).attr("maxdate").trim(), formato))[6];
                //Validar atributo set
                var attrSet = false;
                if ($(this).attr("objectset")) {
                    attrSet = true;
                    var objectSet = $(this).attr("objectset").trim();//Objeto a modificar
                }
                //Validar auto update
                var attrAutoUpdate = true;
                if ($(this).attr("autoupdate")=="false") attrAutoUpdate = false;
                //Validar ejecutar función
                var functionExecute = "";
                if ($(this).attr("functionexecute")) functionExecute = $(this).attr("functionexecute").trim();
                //Validar atributo datevalid
                var dateValid = "";
                if ($(this).attr("datevalid")) dateValid = $(this).attr("datevalid").trim();
                //Validar atributo blockfestivos
                var blockHolidays = false;
                if ($(this).attr("blockfestivos")) {
                    if ($(this).attr("blockfestivos")=="true") blockHolidays = true;
                }
                //Validar atributo festivos
                var holidays = true;
                if ($(this).attr("festivos")) {
                    if ($(this).attr("festivos")=="false") holidays = false;
                }
                //Validar atributo domingos
                var sundays = true;
                if ($(this).attr("domingos")) {
                    if ($(this).attr("domingos")=="false") sundays = false;
                }
                //Validar atributo día actual
                var today = true;
                if ($(this).attr("today")) {
                    if ($(this).attr("today")=="false") today = false;
                }
                //Validar atributo colordays
                var colorDays = [];
                if ($(this).attr("colorDays")) colorDays = JSON.parse(decodeURIComponent(escape(atob($(this).attr("colorDays")))));
                /**
                 * Creación del datepicker
                 */
                $(this).daterangepicker({
                    "singleDatePicker": true,//Uno o dos calendarios
                    "showDropdowns": true,//Mostrar desplegable para seleccionar mes y año
                    "showWeekNumbers": true,//Formato de semana normal
                    "showISOWeekNumbers": false,//Formato de semana ISO
                    "timePicker": attrTime,//Habilitar seleccionar hora
                    "timePickerIncrement": 1,//Incrementar minutos
                    "timePicker24Hour": true,//Formato de hora militar
                    "timePickerSeconds": attrSeconds,//Habilitar segundos
                    "autoApply": false,//Aplicar automáticamente cuando selecciono dos fechas
                    "autoUpdateInput": attrAutoUpdate,//Actualizar fecha automáticamente
                    "locale": {
                        "format": formato,//Formato a mostrar, debe coincidir con los de abajo
                        "separator": " - ",
                        "applyLabel": "Aceptar",//Nombre botón aplicar
                        "cancelLabel": "Cancelar",//Nombre botón cancelar
                        "fromLabel": "Desde",
                        "toLabel": "Hasta",
                        "customRangeLabel": "Custom",//Abrir siempre en custom
                        "weekLabel": "S",//Identificador semana
                        "daysOfWeek": [//Abreviatura de nombre de días
                            "Do",
                            "Lu",
                            "Ma",
                            "Mi",
                            "Ju",
                            "Vi",
                            "Sá"
                        ],
                        "monthNames": [//Nombre de meses
                            "Enero",
                            "Febrero",
                            "Marzo",
                            "Abril",
                            "Mayo",
                            "Junio",
                            "Julio",
                            "Agosto",
                            "Septiembre",
                            "Octubre",
                            "Noviembre",
                            "Diciembre"
                        ],
                        "firstDay": 1//Primer día de la semana 0 domingo - 6 sábado
                    },
                    "linkedCalendars": false,//Calendarios seguidos
                    "alwaysShowCalendars": true,//Siempre mostrar calendario
                    "startDate": startDate,//Fecha inicial
                    "endDate": false,//Fecha final
                    "minDate": attrMinDate,//Fecha mínima
                    "maxDate": attrMaxDate,//Fecha máxima
                    "opens": "right",//Mostrar izquierda, centrado, derecha
                    "drops": "down",//Abrir hacia arriba o abajo
                    /**
                     * Una función que se pasa cada fecha en los dos calendarios antes de que se muestren,
                     * y puede devolver verdadero o falso para indicar si esa fecha debe estar disponible para su selección o no.
                     * @param  {Object}  date [Fecha de cada día del calendario]
                     * @return {Boolean}      [Retorna un booleano]
                     */
                    isInvalidDate: function(date) {
                        //Validar si se bloquean días de la semana
                        if (dateValid!="") {
                            var array_validar_fecha = dateValid.split('|');
                            var dateFormat = array_validar_fecha[0].trim();
                            var array_obj_validar =  array_validar_fecha[1].trim().split('_');
                            for (var j=0; j<array_obj_validar.length; j++) {
                                if (date.format(dateFormat)==array_obj_validar[j]) return true;
                            }
                        }
                        //Validar si se bloquean los festivos
                        if (blockHolidays) {
                            var anio = date.format("YYYY");
                            var mes = date.format("M");
                            var dia = date.format("D");
                            var festivos = new Festivos(anio);
                            if (festivos.esFestivo(dia, mes)) return true;
                        }
                        return false;
                    },
                    /**
                     * Una función que se pasa cada fecha en los dos calendarios antes de que se muestren,
                     * y puede devolver una cadena o conjunto de nombres de clase CSS para aplicar a la celda del calendario de esa fecha.
                     * @param  {Object}  date [Fecha de cada día del calendario]
                     * @return {String-Array} [Retorna una cadena o un arreglo de nombres de clase CSS]
                     */
                    isCustomDate: function(date) {
                        return DATEPICKER.dateapps.isCustomDate(date, holidays, sundays, today, colorDays);
                    }
                }, function(chosen_date, start, end, label) {//Función a ejecutar cuando elijo una fecha
                    actual_object.val(chosen_date.format(formato));
                    //Validar ejecutar funcion al elegir fecha
                    if (functionExecute!="") {
                        var array_funcion = functionExecute.split('|');
                        for (var j=0; j<array_funcion.length; j++) {
                            var obj_funcion = array_funcion[j].trim().split(':');
                            var fn = window[obj_funcion[0]];
                            if (obj_funcion.length>1) {
                                var array_params = obj_funcion[1].split('_');
                                var fnparams = [];
                                for (var k=0; k<array_params.length; k++) {
                                    fnparams.push(array_params[k].trim());
                                }
                                if (typeof fn === "function") fn.apply(null, fnparams);
                            } else {
                                if (typeof fn === "function") fn();
                            }
                        }
                    }
                    if (attrSet) {
                        $("#"+objectSet).attr("mindate", chosen_date.format(formato));
                        $("#"+objectSet).attr("maxdate", moment().format(formato));
                        datetimelocal(selectorDTL);
                    }
                });
                //Colocar valor vacío al cargar la página
                if (verificar_valor==0) actual_object.val("");
                $(this).on("apply.daterangepicker", function(ev, picker) {
                    actual_object.val(picker.startDate.format(formato));
                    //Validar ejecutar funcion al elegir fecha
                    if (functionExecute!="") {
                        var array_funcion = functionExecute.split('|');
                        for (var j=0; j<array_funcion.length; j++) {
                            var obj_funcion = array_funcion[j].trim().split(':');
                            var fn = window[obj_funcion[0]];
                            if (obj_funcion.length>1) {
                                var array_params = obj_funcion[1].split('_');
                                var fnparams = [];
                                for (var k=0; k<array_params.length; k++) {
                                    fnparams.push(array_params[k].trim());
                                }
                                if (typeof fn === "function") fn.apply(null, fnparams);
                            } else {
                                if (typeof fn === "function") fn();
                            }
                        }
                    }
                    if (attrSet) {
                        $("#"+objectSet).attr("mindate", picker.startDate.format(formato));
                        $("#"+objectSet).attr("maxdate", moment().format(formato));
                        datetimelocal(selectorDTL);
                    }
                });
                $(this).on("cancel.daterangepicker", function(ev, picker) {//Acción a realizar al oprimir botón Cancel
                    actual_object.val("");
                    if (attrSet) {
                        $("#"+objectSet).val("");
                        $("#"+objectSet).attr("mindate", moment().format(formato));
                        $("#"+objectSet).attr("maxdate", moment().format(formato));
                        datetimelocal(selectorDTL);
                    }
                });
            });
            /**
             * Función para validar datepicker tipo local [datetimelocal]
             * @param  {String} selectorValidar           [Tipo de elemento a validar]
             * @return {Boolean}                          [Retorna un booleano]
             */
            function datetimelocalValidar(selectorValidar=".datetime-local") {
                var cont = 0;
                var revisar_fechas = "";
                /**
                 * Función que recorre cada elemento selector
                 * @param  {Integer} i  [Contador de cantidad de veces que recorre la función .each()]
                 * @param  {Object} e   [Elemento actual del DOM - cambia en cada iteración]
                 * @return {null}       [Sin retorno]
                 */
                $(selectorValidar).each(function(i, e) {
                    var cont_var = 0;
                    var fecha = e.value;
                    if (fecha=="") {
                        if (e.hasAttribute("required")) {//verificar si tiene el elemento tiene atributo required
                            e.style.border = "solid 1.5px #B40404";
                            $(this).animate({
                                border: "solid 1.5px #B40404"
                            }, 8000, function() {
                                e.style.border = "solid 1px #7A1F5E";
                            });
                            cont_var++;
                        }
                    } else {
                        if (!moment(fecha, "YYYY-MM-DD").isValid()) cont_var++;
                    }
                    if (cont_var>0) {
                        cont++;
                        revisar_fechas+="- "+$(this).attr("nombre")+"<br>";
                    }
                });
                if (cont==0) {
                    return true;
                } else {
                    alertify.alert("Por favor verifique la fecha de los siguientes campos:", revisar_fechas);
                    return false;
                }
            }
            /* retornar las funciones */
            return {
                datetimelocal: datetimelocal,
                datetimelocalValidar: datetimelocalValidar
            }
        }
    )(".datetime-local"),/*Fin de la función datetimelocal*/

    daterange: (
        /**
         * Función para ejecutar datepicker de tipo rango [daterange]
         * @param  {String} selectorDR [Tipo de elemento para aplicar el datepicker]
         * @return {Function}          [Retorna funciones daterange y daterangeValidar para que puedan ser llamadas]
         */
        function daterange(selectorDR=".daterange") {
            /**
             * Función que recorre cada elemento selector
             * @param  {Integer} i  [Contador de cantidad de veces que recorre la función .each()]
             * @param  {Object} e   [Elemento actual del DOM - cambia en cada iteración]
             * @return {null}       [Sin retorno]
             */
            $(selectorDR).each(function(i, e) {
                var actual_object = $(this);
                var verificar_valor = 0;
                //Validar si es timepicker y es formato con segundos
                var formato = "YYYY-MM-DD";
                var attrTime = false;
                var attrSeconds = false;
                if ($(this).attr("time")=="true") {
                    attrTime = true;
                    formato = "YYYY-MM-DD HH:mm";
                    if ($(this).attr("seconds")=="true") {
                        attrSeconds = true;
                        formato = "YYYY-MM-DD HH:mm:ss";
                    }
                }
                if ($(this).val()!="") {
                    var startDate = Object.values(moment($(this).val().split(" a ")[0], formato))[6];
                    var endDate = Object.values(moment($(this).val().split(" a ")[1], formato))[6];
                    verificar_valor++;
                } else {
                    var startDate = new Date();
                    var endDate = new Date();
                }
                //Validar atributo linkedcalendars
                var attrLinkedCalendars = false;
                if ($(this).attr("linkedcalendars")=="true") var attrLinkedCalendars = true;
                //Validar atributos min, max
                var attrMinDate = false;
                var attrMaxDate = false;
                if ($(this).attr("mindate")) attrMinDate = Object.values(moment($(this).attr("mindate"), formato))[6];
                if ($(this).attr("maxdate")) attrMaxDate = Object.values(moment($(this).attr("maxdate"), formato))[6];
                //Validar auto update
                var attrAutoApply = true;
                if ($(this).attr("autoapply")=="false") attrAutoApply = false;
                //Validar ejecutar función
                var functionExecute = "";
                if ($(this).attr("functionexecute")) functionExecute = $(this).attr("functionexecute").trim();
                //Validar si se muestran los festivos
                var holidays = true;
                if ($(this).attr("festivos")) {
                    if ($(this).attr("festivos")=="false") holidays = false;
                }
                //Validar si se muestran los domingos
                var sundays = true;
                if ($(this).attr("domingos")) {
                    if ($(this).attr("domingos")=="false") sundays = false;
                }
                //Validar atributo día actual
                var today = true;
                if ($(this).attr("today")) {
                    if ($(this).attr("today")=="false") today = false;
                }
                //Validar atributo colordays
                var colorDays = [];
                if ($(this).attr("colorDays")) colorDays = JSON.parse(decodeURIComponent(escape(atob($(this).attr("colorDays")))));
                /**
                 * Creación del datepicker
                 */
                $(this).daterangepicker({
                    "singleDatePicker": false,//Uno o dos calendarios
                    "showDropdowns": true,//Mostrar desplegable para seleccionar mes y año
                    "showWeekNumbers": true,//Formato de semana normal
                    "showISOWeekNumbers": false,//Formato de semana ISO
                    "timePicker": attrTime,//Habilitar seleccionar hora
                    "timePickerIncrement": 1,//Incrementar minutos
                    "timePicker24Hour": true,//Formato de hora militar
                    "timePickerSeconds": attrSeconds,//Habilitar segundos
                    "autoApply": attrAutoApply,//Aplicar automáticamente cuando selecciono dos fechas
                    "autoUpdateInput": true,//Actualizar fecha automáticamente
                    // "maxSpan": {
                    //     "days": 0,
                    //     "months": 1
                    // },//Al seleccionar una fecha restrinjo cuantos días puede seleccionar después
                    "locale": {
                        "format": formato,//Formato a mostrar, debe coincidir con los de abajo
                        "separator": " a ",
                        "applyLabel": "Aceptar",//Nombre botón aplicar
                        "cancelLabel": "Cancelar",//Nombre botón cancelar
                        "fromLabel": "Desde",
                        "toLabel": "Hasta",
                        "customRangeLabel": "Custom",//Abrir siempre en custom
                        "weekLabel": "S",//Identificador semana
                        "daysOfWeek": [
                            "Do",
                            "Lu",
                            "Ma",
                            "Mi",
                            "Ju",
                            "Vi",
                            "Sá"
                        ],//Abreviatura de nombre de días
                        "monthNames": [
                            "Enero",
                            "Febrero",
                            "Marzo",
                            "Abril",
                            "Mayo",
                            "Junio",
                            "Julio",
                            "Agosto",
                            "Septiembre",
                            "Octubre",
                            "Noviembre",
                            "Diciembre"
                        ],//Nombre de meses
                        "firstDay": 1//Primer día de la semana 0 domingo - 6 sábado
                    },
                    "linkedCalendars": attrLinkedCalendars,//Calendarios seguidos
                    "alwaysShowCalendars": true,//Siempre mostrar calendario
                    "startDate": startDate,//Fecha inicial
                    "endDate": endDate,//Fecha final
                    "minDate": attrMinDate,//Fecha mínima
                    "maxDate": attrMaxDate,//Fecha máxima
                    "opens": "right",//Mostrar izquierda, centrado, derecha
                    "drops": "down",//Abrir hacia arriba o abajo
                    /**
                     * Una función que se pasa cada fecha en los dos calendarios antes de que se muestren,
                     * y puede devolver una cadena o conjunto de nombres de clase CSS para aplicar a la celda del calendario de esa fecha.
                     * @param  {Object}  date [Fecha de cada día del calendario]
                     * @return {String-Array} [Retorna una cadena o un arreglo de nombres de clase CSS]
                     */
                    isCustomDate: function(date) {
                        return DATEPICKER.dateapps.isCustomDate(date, holidays, sundays, today, colorDays);
                    }
                }, function(chosen_date, start, end, label) {//Función que asigna valor al input cuando elijo una fecha
                    actual_object.val(chosen_date.format("YYYY-MM-DD")+" a "+start.format("YYYY-MM-DD"));
                    //Validar ejecutar funcion al elegir fecha
                    if (functionExecute!="") {
                        var array_funcion = functionExecute.split('|');
                        for (var j=0; j<array_funcion.length; j++) {
                            var obj_funcion = array_funcion[j].trim().split(':');
                            var fn = window[obj_funcion[0]]
                            if (obj_funcion.length>1) {
                                var array_params = obj_funcion[1].split('_');
                                var fnparams = [];
                                for (var k=0; k<array_params.length; k++) {
                                    fnparams.push(array_params[k].trim());
                                }
                                if (typeof fn === "function") fn.apply(null, fnparams);
                            } else {
                                if (typeof fn === "function") fn();
                            }
                        }
                    }
                });
                if (verificar_valor==0) $(this).val("");
                $(this).on("apply.daterangepicker", function(ev, picker) {//Acción a realizar al oprimir botón Apply
                    actual_object.val(picker.startDate.format("YYYY-MM-DD")+" a "+picker.endDate.format("YYYY-MM-DD"));
                    //Validar ejecutar funcion al elegir fecha
                    if (functionExecute!="") {
                        var array_funcion = functionExecute.split('|');
                        for (var j=0; j<array_funcion.length; j++) {
                            var obj_funcion = array_funcion[j].trim().split(':');
                            var fn = window[obj_funcion[0]];
                            if (obj_funcion.length>1) {
                                var array_params = obj_funcion[1].split('_');
                                var fnparams = [];
                                for (var k=0; k<array_params.length; k++) {
                                    fnparams.push(array_params[k].trim());
                                }
                                if (typeof fn === "function") fn.apply(null, fnparams);
                            } else {
                                if (typeof fn === "function") fn();
                            }
                        }
                    }
                });
                $(this).on("cancel.daterangepicker", function(ev, picker) {
                    $(this).val('');
                });
            });
            /**
             * Función para validar datepicker tipo rango [daterange]
             * @param  {String} selectorValidar           [Tipo de elemento a validar]
             * @return {Boolean}                          [Retorna un booleano]
             */
            function daterangeValidar(selectorValidar=".daterange") {
                var cont = 0;
                var revisar_fechas = "";
                /**
                 * Función que recorre cada elemento selector
                 * @param  {Integer} i  [Contador de cantidad de veces que recorre la función .each()]
                 * @param  {Object} e   [Elemento actual del DOM - cambia en cada iteración]
                 * @return {null}       [Sin retorno]
                 */
                $(selectorValidar).each(function(i, e) {
                    var cont_var = 0;
                    var fecha = e.value;
                    if (fecha.length!=23) {//debe tener este formato "YYYY-MM-DD a YYYY-MM-DD" y longitud de 23
                        cont_var++;
                        e.style.border = "solid 1.5px #B40404";
                        $(this).animate({
                            border: "solid 1.5px #B40404"
                        }, 8000, function() {
                            e.style.border = "solid 1px #7A1F5E";
                        });
                    } else {
                        for (var j=0;j<2;j++) {
                            var array_fecha = moment(fecha.split(" a ")[j], "YYYY-MM-DD");
                            if (!array_fecha.isValid()) cont_var++;//si el valor es nulo arroja false
                        }
                    }
                    if (cont_var>0) {
                        cont++;
                        revisar_fechas+="- "+$(this).attr("nombre")+"<br>";
                    }
                });
                if (cont==0) {
                    return true;
                } else {
                    alertify.alert("Por favor verifique la fecha de los siguientes campos:", revisar_fechas);
                    return false;
                }
            }
            /* retornar las funciones */
            return {
                daterange: daterange,
                daterangeValidar: daterangeValidar
            }
        }
    )(".daterange"),/*Fin de la función daterange*/

    dateweek: (
        /**
         * Función para ejecutar datepicker de tipo semanal [dateweek]
         * @param  {String}  selectorDW          [Tipo de elemento para aplicar el datepicker]
         * @param  {Boolean||String} selectedDay [Día de la semana seleccionado, inicia con booleano porque no tiene valor. Cuando se envía parámetro es de tipo String]
         * @param  {Boolean} btn_focus           [Valida si se debe enfocar un elemento]
         * @return {Function}                    [Retorna función dateweek para que pueda ser llamada]
         */
        function dateweek(selectorDW=".dateweek", selectedDay=false, btn_focus=false) {
            /**
             * Función que recorre cada elemento selector
             * @param  {Integer} i  [Contador de cantidad de veces que recorre la función .each()]
             * @param  {Object} e   [Elemento actual del DOM - cambia en cada iteración]
             * @return {null}       [Sin retorno]
             */
            $(selectorDW).each(function(i, e) {
                var actual_object = $(this);
                //Obtener valor
                var startDate = false;
                if ($(this).val()!="") {
                    var week_month = moment($(this).val(), "YYYY-MM-DD").format('w-MM');
                    var fecha_inicial = $(this).val();
                    if (week_month=="1-12") {
                        if (typeof selectedDay === "string") {
                            if (selectedDay!='0') {
                                fecha_inicial = moment($(this).val(), "YYYY-MM-DD").format("YYYY-01-01");
                            } else {
                                fecha_inicial = moment($(this).val(), "YYYY-MM-DD").subtract(1, "day").startOf('week').add(1, "day").format("YYYY-MM-DD");
                            }
                        } else {
                            fecha_inicial = moment($(this).val(), "YYYY-MM-DD").add(1, "year").format("YYYY-01-01");
                        }
                        startDate = Object.values(moment(fecha_inicial, "YYYY-MM-DD"))[6];
                    } else if (week_month=="1-01") {
                        fecha_inicial = moment($(this).val(), "YYYY-MM-DD").format("YYYY-01-01");
                        startDate = Object.values(moment(fecha_inicial, "YYYY-MM-DD"))[6];
                    } else {
                        startDate = Object.values(moment(fecha_inicial, "YYYY-MM-DD"))[6];
                    }
                } else {
                    startDate = new Date();
                }
                //Validar atributos min, max
                var attrMinDate = false;
                var attrMaxDate = false;
                if ($(this).attr("mindate")) {
                    var fecha_minima = moment($(this).attr("mindate"), "YYYY-MM-DD").format('d');
                    if (fecha_minima!='0') {
                        attrMinDate = Object.values(moment($(this).attr("mindate"), "YYYY-MM-DD").startOf('week').add(1, "day"))[6];
                    } else {
                        attrMinDate = Object.values(moment($(this).attr("mindate"), "YYYY-MM-DD").subtract(1, "day").startOf('week').add(1, "day"))[6];
                    }
                }
                if ($(this).attr("maxdate")) {
                    var fecha_maxima = moment($(this).attr("maxdate"), "YYYY-MM-DD").format('d');
                    if (fecha_maxima!='0') {
                        attrMaxDate = Object.values(moment($(this).attr("maxdate"), "YYYY-MM-DD").endOf('week').add(1, "day"))[6];
                    } else {
                        attrMaxDate = Object.values(moment($(this).attr("maxdate"), "YYYY-MM-DD"))[6];
                    }
                }
                //Validar atributo de botón onfocus
                var id_btn = "";
                if ($(this).attr("btnfocus")) id_btn = $(this).attr("btnfocus");
                //Validar si se muestran los festivos
                var holidays = true;
                if ($(this).attr("festivos")) {
                    if ($(this).attr("festivos")=="false") holidays = false;
                }
                //Validar si se muestran los domingos
                var sundays = true;
                if ($(this).attr("domingos")) {
                    if ($(this).attr("domingos")=="false") sundays = false;
                }
                //Validar atributo día actual
                var today = true;
                if ($(this).attr("today")) {
                    if ($(this).attr("today")=="false") today = false;
                }
                //Validar atributo colordays
                var colorDays = [];
                if ($(this).attr("colorDays")) colorDays = JSON.parse(decodeURIComponent(escape(atob($(this).attr("colorDays")))));
                /**
                 * Creación del datepicker
                 */
                $(this).daterangepicker({
                    "singleDatePicker": true,//Uno o dos calendarios
                    "showDropdowns": true,//Mostrar desplegable para seleccionar mes y año
                    "showWeekNumbers": true,//Formato de semana normal
                    "showISOWeekNumbers": false,//Formato de semana ISO
                    "timePicker": false,//Habilitar seleccionar hora
                    "timePickerIncrement": 1,//Incrementar minutos
                    "timePicker24Hour": false,//Formato de hora militar
                    "timePickerSeconds": false,//Habilitar segundos
                    "autoApply": false,//Aplicar automáticamente cuando selecciono dos fechas
                    "autoUpdateInput": true,//Actualizar fecha automáticamente
                    "locale": {
                        "format": "w - YYYY",//Formato a mostrar, debe coincidir con los de abajo
                        "separator": " a ",
                        "applyLabel": "Aceptar",//Nombre botón aplicar
                        "cancelLabel": "Cancelar",//Nombre botón cancelar
                        "fromLabel": "Desde",
                        "toLabel": "Hasta",
                        "customRangeLabel": "Custom",//Abrir siempre en custom
                        "weekLabel": "S",//Identificador semana
                        "daysOfWeek": [
                            "Do",
                            "Lu",
                            "Ma",
                            "Mi",
                            "Ju",
                            "Vi",
                            "Sá"
                        ],//Abreviatura de nombre de días
                        "monthNames": [
                            "Enero",
                            "Febrero",
                            "Marzo",
                            "Abril",
                            "Mayo",
                            "Junio",
                            "Julio",
                            "Agosto",
                            "Septiembre",
                            "Octubre",
                            "Noviembre",
                            "Diciembre"
                        ],//Nombre de meses
                        "firstDay": 1//Primer día de la semana 0 domingo - 6 sábado
                    },
                    "linkedCalendars": false,//Calendarios seguidos
                    "alwaysShowCalendars": true,//Siempre mostrar calendario
                    "startDate": startDate,//Fecha inicial
                    "endDate": false,//Fecha final
                    "minDate": attrMinDate,//Fecha mínima
                    "maxDate": attrMaxDate,//Fecha máxima
                    "opens": "right",//Mostrar izquierda, centrado, derecha
                    "drops": "down",//Abrir hacia arriba o abajo
                    /**
                     * Una función que se pasa cada fecha en los dos calendarios antes de que se muestren,
                     * y puede devolver una cadena o conjunto de nombres de clase CSS para aplicar a la celda del calendario de esa fecha.
                     * @param  {Object}  date [Fecha de cada día del calendario]
                     * @return {String-Array} [Retorna una cadena o un arreglo de nombres de clase CSS]
                     */
                    isCustomDate: function(date) {
                        return DATEPICKER.dateapps.isCustomDate(date, holidays, sundays, today, colorDays);
                    }
                }, function(chosen_date, start, end, label) {//Función que asigna valor al input cuando elijo una fecha
                    var dia_semana = chosen_date.format('d');
                    var fecha_seleccionar = "";
                    var semana_mes = chosen_date.format("w-MM");
                    //Validar semana y mes del año
                    if (semana_mes=="1-12") {
                        //Validar el día de la semana seleccionado
                        if (dia_semana!='0') {
                            fecha_seleccionar = chosen_date.add(1, "year").format("YYYY-01-01");
                            actual_object.data('daterangepicker').setStartDate(moment(fecha_seleccionar, "YYYY-MM-DD"));
                            actual_object.data('daterangepicker').setEndDate(moment(fecha_seleccionar, "YYYY-MM-DD"));
                        } else {
                            fecha_seleccionar = chosen_date.format("YYYY-MM-DD");
                            actual_object.data('daterangepicker').setStartDate(moment(fecha_seleccionar, "YYYY-MM-DD").subtract(1, "day"));
                            actual_object.data('daterangepicker').setEndDate(moment(fecha_seleccionar, "YYYY-MM-DD").subtract(1, "day"));
                        }
                    } else if (semana_mes=="1-01") {
                        //Validar el día de la semana seleccionado
                        if (dia_semana!='0') {
                            fecha_seleccionar = chosen_date.format("YYYY-01-01");
                            actual_object.data('daterangepicker').setStartDate(moment(fecha_seleccionar, "YYYY-MM-DD"));
                            actual_object.data('daterangepicker').setEndDate(moment(fecha_seleccionar, "YYYY-MM-DD"));
                        } else {
                            fecha_seleccionar = chosen_date.subtract(1, "day").startOf('week').add(1, "day").format("YYYY-MM-DD");
                            actual_object.data('daterangepicker').setStartDate(moment(fecha_seleccionar, "YYYY-MM-DD").subtract(1, "day"));
                            actual_object.data('daterangepicker').setEndDate(moment(fecha_seleccionar, "YYYY-MM-DD").subtract(1, "day"));
                        }
                    } else if (semana_mes=="2-01") {
                        //Validar el día de la semana seleccionado
                        if (dia_semana!='0') {
                            fecha_seleccionar = chosen_date.startOf('week').add(1, "day").format("YYYY-MM-DD");
                        } else {
                            fecha_seleccionar = chosen_date.format("YYYY-01-01");
                            actual_object.data('daterangepicker').setStartDate(moment(fecha_seleccionar, "YYYY-MM-DD"));
                            actual_object.data('daterangepicker').setEndDate(moment(fecha_seleccionar, "YYYY-MM-DD"));
                        }
                    } else {
                        //Validar el día de la semana seleccionado
                        if (dia_semana!='0') {
                            fecha_seleccionar = chosen_date.startOf('week').add(1, "day").format("YYYY-MM-DD");
                        } else {
                            fecha_seleccionar = chosen_date.subtract(1, "day").startOf('week').add(1, "day").format("YYYY-MM-DD");
                            actual_object.data('daterangepicker').setStartDate(moment(fecha_seleccionar, "YYYY-MM-DD").subtract(1, "day"));
                            actual_object.data('daterangepicker').setEndDate(moment(fecha_seleccionar, "YYYY-MM-DD").subtract(1, "day"));
                        }
                    }
                    actual_object.val(fecha_seleccionar);
                    if (id_btn!="") {
                        dateweek(selectorDW, dia_semana, true);
                    } else {
                        dateweek(selectorDW, dia_semana, false);
                    }
                });
                //Validar si enfoca un botón
                if (btn_focus) $("#"+id_btn).focus();
            });
            /* retornar las funciones */
            return {
                dateweek: dateweek
            }
        }
    )(".dateweek", false, false),/*Fin de la función dateweek*/

    datemonth: (
        /**
         * Función para ejecutar datepicker de tipo mensual [datemonth]
         * @param  {String}  selectorDM [Tipo de elemento para aplicar el datepicker]
         * @param  {Boolean} btn_focus  [Valida si se debe enfocar un elemento]
         * @return {Function}           [Retorna función datemonth para que pueda ser llamada]
         */
        function datemonth(selectorDM=".datemonth", btn_focus=false) {
            /**
             * Función que recorre cada elemento selector
             * @param  {Integer} i  [Contador de cantidad de veces que recorre la función .each()]
             * @param  {Object} e   [Elemento actual del DOM - cambia en cada iteración]
             * @return {null}       [Sin retorno]
             */
            $(selectorDM).each(function(i, e) {
                var actual_object = $(this);
                //Obtener valor
                if ($(this).val()!="") {
                    var startDate = Object.values(moment($(this).val(), "YYYY-MM").startOf('month'))[6];
                } else {
                    var startDate = moment().startOf('month')._d;
                }
                //Validar atributos min, max
                var attrMinDate = false;
                var attrMaxDate = false;
                if ($(this).attr("mindate")) attrMinDate = Object.values(moment($(this).attr("mindate"), "YYYY-MM").startOf('month'))[6];
                if ($(this).attr("maxdate")) attrMaxDate = Object.values(moment($(this).attr("maxdate"), "YYYY-MM").endOf('month'))[6];
                //Validar atributo de botón onfocus
                var id_btn = "";
                if ($(this).attr("btnfocus")) id_btn = $(this).attr("btnfocus");
                //Validar si se muestran los festivos
                var holidays = true;
                if ($(this).attr("festivos")) {
                    if ($(this).attr("festivos")=="false") holidays = false;
                }
                //Validar si se muestran los domingos
                var sundays = true;
                if ($(this).attr("domingos")) {
                    if ($(this).attr("domingos")=="false") sundays = false;
                }
                //Validar atributo día actual
                var today = true;
                if ($(this).attr("today")) {
                    if ($(this).attr("today")=="false") today = false;
                }
                //Validar atributo colordays
                var colorDays = [];
                if ($(this).attr("colorDays")) colorDays = JSON.parse(decodeURIComponent(escape(atob($(this).attr("colorDays")))));
                /**
                 * Creación del datepicker
                 */
                $(this).daterangepicker({
                    "singleDatePicker": true,//Uno o dos calendarios
                    "showDropdowns": true,//Mostrar desplegable para seleccionar mes y año
                    "showWeekNumbers": true,//Formato de semana normal
                    "showISOWeekNumbers": false,//Formato de semana ISO
                    "timePicker": false,//Habilitar seleccionar hora
                    "timePickerIncrement": 1,//Incrementar minutos
                    "timePicker24Hour": false,//Formato de hora militar
                    "timePickerSeconds": false,//Habilitar segundos
                    "autoApply": false,//Aplicar automáticamente cuando selecciono dos fechas
                    "autoUpdateInput": true,//Actualizar fecha automáticamente
                    "ranges": {
                        'Enero': [moment(actual_object.val(), "YYYY-MM").startOf('year'), moment(actual_object.val(), "YYYY-MM").startOf('year')],
                        'Febrero': [moment(actual_object.val(), "YYYY-MM").startOf('year').add(1, 'month'), moment(actual_object.val(), "YYYY-MM").startOf('year').add(1, 'month')],
                        'Marzo': [moment(actual_object.val(), "YYYY-MM").startOf('year').add(2, 'month'), moment(actual_object.val(), "YYYY-MM").startOf('year').add(2, 'month')],
                        'Abril': [moment(actual_object.val(), "YYYY-MM").startOf('year').add(3, 'month'), moment(actual_object.val(), "YYYY-MM").startOf('year').add(3, 'month')],
                        'Mayo': [moment(actual_object.val(), "YYYY-MM").startOf('year').add(4, 'month'), moment(actual_object.val(), "YYYY-MM").startOf('year').add(4, 'month')],
                        'Junio': [moment(actual_object.val(), "YYYY-MM").startOf('year').add(5, 'month'), moment(actual_object.val(), "YYYY-MM").startOf('year').add(5, 'month')],
                        'Julio': [moment(actual_object.val(), "YYYY-MM").startOf('year').add(6, 'month'), moment(actual_object.val(), "YYYY-MM").startOf('year').add(6, 'month')],
                        'Agosto': [moment(actual_object.val(), "YYYY-MM").startOf('year').add(7, 'month'), moment(actual_object.val(), "YYYY-MM").startOf('year').add(7, 'month')],
                        'Septiembre': [moment(actual_object.val(), "YYYY-MM").startOf('year').add(8, 'month'), moment(actual_object.val(), "YYYY-MM").startOf('year').add(8, 'month')],
                        'Octubre': [moment(actual_object.val(), "YYYY-MM").startOf('year').add(9, 'month'), moment(actual_object.val(), "YYYY-MM").startOf('year').add(9, 'month')],
                        'Noviembre': [moment(actual_object.val(), "YYYY-MM").startOf('year').add(10, 'month'), moment(actual_object.val(), "YYYY-MM").startOf('year').add(10, 'month')],
                        'Diciembre': [moment(actual_object.val(), "YYYY-MM").startOf('year').add(11, 'month'), moment(actual_object.val(), "YYYY-MM").startOf('year').add(11, 'month')]
                    },
                    "locale": {
                        "format": "MMMM - YYYY",//Formato a mostrar, debe coincidir con los de abajo
                        "separator": " a ",
                        "applyLabel": "Aceptar",//Nombre botón aplicar
                        "cancelLabel": "Cancelar",//Nombre botón cancelar
                        "fromLabel": "Desde",
                        "toLabel": "Hasta",
                        "customRangeLabel": "Custom",//Abrir siempre en custom
                        "weekLabel": "S",//Identificador semana
                        "daysOfWeek": [
                            "Do",
                            "Lu",
                            "Ma",
                            "Mi",
                            "Ju",
                            "Vi",
                            "Sá"
                        ],//Abreviatura de nombre de días
                        "monthNames": [
                            "Enero",
                            "Febrero",
                            "Marzo",
                            "Abril",
                            "Mayo",
                            "Junio",
                            "Julio",
                            "Agosto",
                            "Septiembre",
                            "Octubre",
                            "Noviembre",
                            "Diciembre"
                        ],//Nombre de meses
                        "firstDay": 1//Primer día de la semana 0 domingo - 6 sábado
                    },
                    "linkedCalendars": false,//Calendarios seguidos
                    "alwaysShowCalendars": true,//Siempre mostrar calendario
                    "startDate": startDate,//Fecha inicial
                    "endDate": false,//Fecha final
                    "minDate": attrMinDate,//Fecha mínima
                    "maxDate": attrMaxDate,//Fecha máxima
                    "opens": "right",//Mostrar izquierda, centrado, derecha
                    "drops": "down",//Abrir hacia arriba o abajo
                    /**
                     * Una función que se pasa cada fecha en los dos calendarios antes de que se muestren,
                     * y puede devolver una cadena o conjunto de nombres de clase CSS para aplicar a la celda del calendario de esa fecha.
                     * @param  {Object}  date [Fecha de cada día del calendario]
                     * @return {String-Array} [Retorna una cadena o un arreglo de nombres de clase CSS]
                     */
                    isCustomDate: function(date) {
                        return DATEPICKER.dateapps.isCustomDate(date, holidays, sundays, today, colorDays);
                    }
                }, function(chosen_date, start, end, label) {//Función que asigna valor al input cuando elijo una fecha
                    actual_object.val(chosen_date.format("YYYY-MM"));
                    if (id_btn!="") datemonth(selectorDM, true);
                });
                //Validar si enfoca un botón
                if (btn_focus) $("#"+id_btn).focus();
            });
            /* retornar las funciones */
            return {
                datemonth: datemonth
            }
        }
    )(".datemonth", false),/*Fin de la función datemonth*/
    
    dateapps: (
        /**
         * Función para validar si un día es festivo
         * @return  {Function}  [Función para validar día festivo]
         */
        function dateapps() {
            /**
             * Función local para validar si un día es festivo
             * @param {Object} date [Objeto de clase la moment o string de fecha en formato YYYY-MM-DD]
             * @return {boolean}    [Validación del día festivo]
             */
            function validarFestivo(date=moment()) {
                var fecha = typeof date==="object" ? date : moment(date, "YYYY-MM-DD");
                var anio = fecha.format("YYYY");
                var mes = fecha.format("M");
                var dia = fecha.format("D");
                var festivos = new Festivos(anio);//festivos.js
                return festivos.esFestivo(dia, mes);
            }
            /**
             * Función para retornar las clases que serán aplicadas a la fecha
             *
             * @param   {Object}   date         [Objeto moment]
             * @param   {boolean}  holidays     [Confirma si se validan los días festivos]
             * @param   {boolean}  sundays      [Confirma si se valida los día domingo]
             * @param   {boolean}  today        [Confirma si se valida el día actual]
             * @param   {Array}    colorDays    [Días para agregar una clase definida por el desarrollador]
             *
             * @return  {Array}                 [Vector con el nombre de las clases css a aplicar]
             */
            function isCustomDate(date=moment(), holidays=false, sundays=false, today=false, colorDays={}) {
                var arrayClass = [];
                //validar si se muestran los festivos
                if (holidays) {
                    if (DATEPICKER.dateapps.festivo(date)) arrayClass.push("daterangepicker_domingo_festivo");
                }
                //validar si se muestran los domingos
                if (sundays) {
                    if (date.format('d')==0) if(arrayClass.indexOf("daterangepicker_domingo_festivo")===-1) arrayClass.push("daterangepicker_domingo_festivo");
                }
                //validar si se resalta el día actual
                if (today) {
                    if (date.isSame(moment(), "day")) arrayClass.push("daterangepicker_today");
                }
                //validar si hay fechas definidas por aplica
                if (colorDays[date.format("YYYY-MM-DD")]) {
                    $.each(colorDays[date.format("YYYY-MM-DD")], function(i, e) {
                        arrayClass.push(e);
                    });
                }
                return arrayClass;
            }
            return {
                festivo: validarFestivo,
                isCustomDate: isCustomDate
            }
        }
    )()/*Fin de la función festivo*/
};

/*****Funciones para validar*****/

/**
 * Función para validar datepicker tipo local [datetimelocal]
 * @param  {String} selectorValidar           [Tipo de elemento a validar]
 * @return {Boolean}                          [Retorna un booleano]
 */
function datetimelocalValidar(selectorValidar=".datetime-local") {
    var cont = 0;
    var revisar_fechas = "";
    /**
     * Función que recorre cada elemento selector
     * @param  {Integer} i  [Contador de cantidad de veces que recorre la función .each()]
     * @param  {Object} e   [Elemento actual del DOM - cambia en cada iteración]
     * @return {null}       [Sin retorno]
     */
    $(selectorValidar).each(function(i, e) {
        var cont_var = 0;
        var fecha = e.value;
        if (fecha=="") {
            if (e.hasAttribute("required")) {//verificar si tiene el elemento tiene atributo required
                e.style.border = "solid 1.5px #B40404";
                $(this).animate({
                    border: "solid 1.5px #B40404"
                }, 8000, function() {
                    e.style.border = "solid 1px #7A1F5E";
                });
                cont_var++;
            }
        } else {
            if (!moment(fecha, "YYYY-MM-DD").isValid()) cont_var++;
        }
        if (cont_var>0) {
            cont++;
            revisar_fechas+="- "+$(this).attr("nombre")+"<br>";
        }
    });
    if (cont==0) {
        return true;
    } else {
        alertify.alert("Por favor verifique la fecha de los siguientes campos:", revisar_fechas);
        return false;
    }
}
/**
 * Función para validar datepicker tipo rango [daterange]
 * @param  {String} selectorValidar           [Tipo de elemento para a validar]
 * @return {Boolean}                          [Retorna un booleano]
 */
function daterangeValidar(selectorValidar=".daterange") {
    var cont = 0;
    var revisar_fechas = "";
    /**
     * Función que recorre cada elemento selector
     * @param  {Integer} i  [Contador de cantidad de veces que recorre la función .each()]
     * @param  {Object} e   [Elemento actual del DOM - cambia en cada iteración]
     * @return {null}       [Sin retorno]
     */
    $(selectorValidar).each(function(i, e) {
        var cont_var = 0;
        var fecha = e.value;
        if (fecha.length!=23) {//debe tener este formato "YYYY-MM-DD a YYYY-MM-DD" y longitud de 23
            cont_var++;
            e.style.border = "solid 1.5px #B40404";
            $(this).animate({
                border: "solid 1.5px #B40404"
            }, 8000, function() {
                e.style.border = "solid 1px #7A1F5E";
            });
        } else {
            for (var j=0;j<2;j++) {
                var array_fecha = moment(fecha.split(" a ")[j], "YYYY-MM-DD");
                if (!array_fecha.isValid()) cont_var++;//si el valor es nulo arroja false
            }
        }
        if (cont_var>0) {
            cont++;
            revisar_fechas+="- "+$(this).attr("nombre")+"<br>";
        }
    });
    if (cont==0) {
        return true;
    } else {
        alertify.alert("Por favor verifique la fecha de los siguientes campos:", revisar_fechas);
        return false;
    }
}
function calcularfecha(fecha, date, ref) {
    var nndate = new Date(date);
    if ($.datepicker.formatDate('mm-dd', date) == fecha) {
        if ($.datepicker.formatDate('mm-D', date) == ref) {
            fechasMov.push($.datepicker.formatDate('yy-mm-dd', date));
        } else {
            for (i = 1; i < 31; i++) {
                nndate.setDate(date.getDate() + i);
                if ($.datepicker.formatDate('mm-D', nndate) == ref) {
                    fechasMov.push($.datepicker.formatDate('yy-mm-dd', nndate));
                    break;
                }
            }
        }
    }
}