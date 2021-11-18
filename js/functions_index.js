// Inicio variables
var alturaContenido = 0;
// Fin variables
// Función para posicionar el menu y dejarlo dijo al hacer scrool
function posicionarMenu(val = false) {
    var alturaPortada = $(".jumbotron").outerHeight(true);
    var alturaHeader = $("#navbar_title").outerHeight(true);
    var alturaMenu = $("#navbar_menu").outerHeight(true);
    if ($(".contenido").scrollTop() >= (alturaHeader + alturaPortada)) {
        // $("#navbar_menu").addClass("fixed");
        // $(".container").css("margin-top", (alturaMenu) + "px");
        $("#logo").css("width", "40px");
        if (val) {// es verdadero cuando se oprimee el botón del menú
            $("#progress_bar").animate({ "position": "", "top": '', "width": "", "zIndex": '' }, 0, () => {
                setTimeout(() => {
                    $("#progress_bar").css({ "position": "fixed", "top": $("#navbar_menu").outerHeight(), "width": "100%", "zIndex": 1000 });
                    heightContent();
                }, 350);
            });
        } else {// entra cuando se hace scroll
            $("#progress_bar").css({ "position": "fixed", "top": $("#navbar_menu").outerHeight(), "width": "100%", "zIndex": 1000 });
            heightContent();
        }
    } else {
        // $("#navbar_menu").removeClass("fixed");
        // $(".container").css("margin-top", '0');
        $("#logo").css("width", "60px");
        $("#progress_bar").css({ "position": "", "top": '', "width": "", "zIndex": '' });
    }
}
// Función para cambiar tema en el submenú cuando se haga scroll
function navMenuChange() {
    var posicionActual = $(".contenido").scrollTop();
    var porcentajeVisto = Math.ceil((posicionActual / alturaContenido) * 100);
    // Modificar progressbar
    $("#progress_bar").find("div").data("valuenow", porcentajeVisto);
    $("#progress_bar").find("div").css("width", porcentajeVisto + '%');
    // Fin modificar progressbar
    var arrayElems = document.getElementsByClassName("menu_elem");
    var newElems = [];
    $.each(arrayElems, (idx, elem) => {
        newElems.push(elem);
    });
    if (newElems.length) {
        var resp = newElems.some((elem, idx, arr) => {
            elem = $(elem);
            var elemNext = $(arr[idx + 1]);
            var top = elem[0].offsetTop - 68;
            var bottom = (elem[0].offsetTop - 68) + elem.outerHeight(true);
            if (idx < arr.length - 1) {// Validar si la posición actual es menos a la últma posición del arreglo
                var topNext = elemNext[0].offsetTop - 68;
                // var bottomNext = (elemNext[0].offsetTop-68)+elemNext.outerHeight(true);
                if (posicionActual >= top && posicionActual < topNext) {
                    $("#menu_navbar").find("a.active").removeClass("active text-sfc-cafe").addClass("text-white-transparent");
                    $("#menu_navbar").find("a").eq(idx).removeClass("text-white-transparent").addClass("active text-sfc-cafe");
                    return true;
                }
            } else {
                if (posicionActual >= top && posicionActual < bottom) {
                    $("#menu_navbar").find("a.active").removeClass("active text-sfc-cafe").addClass("text-white-transparent");
                    $("#menu_navbar").find("a").eq(idx).removeClass("text-white-transparent").addClass("active text-sfc-cafe");
                    return true;
                }
            }
            return false;
        });
        if (resp !== true) $("#menu_navbar").find("a.active").removeClass("active text-sfc-cafe").addClass("text-white-transparent");
    }
}
// Función para hacer scroll
function doScroll(elem, _this = undefined) {
    $("body,.contenido").animate({ scrollTop: document.getElementById(elem).offsetTop - $("#navbar_menu").outerHeight(true) }, 1000, () => {
        $("#menu_navbar").find("a.active").removeClass("active text-sfc-cafe").addClass("text-white-transparent");
        if (_this != undefined) {
            $(_this).addClass("active text-sfc-cafe");
        }
    });
    $("body,.contenido").click();
}
// Función para calcular la altura del contenido
function heightContent() {
    alturaContenido = Math.ceil(document.getElementById("final_contenido").offsetTop - $(".contenido").height());
}
// Función para validar tamaño de la pantalla y aplicar estilos
// function whenResize() {
//     var width = $(window).outerWidth(true);
//     var elem = $(".col_responsive_principal");
//     if (width<=349) {
//         // if (!elem.find(".col_responsive_estadistica").hasClass("col-sm-10")) {
//         //     elem.find(".col_responsive_estadistica").removeClass("col-sm-6 col-sm-12").addClass("col-sm-10");
//         // }
//     } else if (width<=767) {
//         if (!elem.find(".col_responsive_estadistica").hasClass("col-sm-12")) {
//             elem.find(".col_responsive_estadistica").removeClass("col-sm-6").addClass("col-sm-12");
//         }
//     } else if (width<=991) {
//         if (!elem.hasClass("col-sm-12")) {
//             elem.removeClass("col-sm-10").addClass("col-sm-12");
//         }
//         elem.find(".col_responsive_estadistica").removeClass("col-sm-12").addClass("col-sm-6");
//     } else {
//         if (!elem.hasClass("col-sm-10")) {
//             elem.removeClass("col-sm-12").addClass("col-sm-10");
//         }
//         elem.find(".col_responsive_estadistica").removeClass("col-sm-12").addClass("col-sm-6");
//     }
// }
// Ejecutar cuando la ventana se redimensione
$(window).resize(() => {
    heightContent();
    // whenResize();
});
// Ejecutar cuando la página cargue
document.addEventListener("DOMContentLoaded", () => {
    // Ejecutar cuando se cumple el evento en el elemento
    document.querySelector("body").addEventListener("click", (e) => {
        if (e.target != document.querySelector("span.navbar-toggler-icon") && e.target != document.querySelector("#btn_navbar")) {//evento cuando NO se oprime el botón del menú navbar
            if ($("#menu_navbar").hasClass("show")) {
                $("#btn_navbar").click();
            }
        }
        if (e.target == document.querySelector("span.navbar-toggler-icon") || e.target == document.querySelector("#btn_navbar")) {//evento cuando se oprime el botón del menú navbar
            posicionarMenu(true);
        }
    });
    // Ejecutar cuando la ventana haga scroll
    document.querySelector(".contenido").addEventListener("scroll", () => {
        posicionarMenu();
        if ($(".contenido").scrollTop() > 0) {
            $(".ir-arriba").slideDown(600);
        } else {
            $(".ir-arriba").slideUp(600);
        }
        navMenuChange();
    });
    // Ejecutar cuando se cumple el evento en el elemento
    document.querySelector(".ir-arriba").addEventListener("click", () => {
        $("body,.contenido").animate({ scrollTop: "0px" }, 1000);
    });
    heightContent();
    // whenResize();
});