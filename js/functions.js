// Función para posicionar el menu y dejarlo dijo al hacer scrool
function posicionarMenu() {
    var alturaHeader = 0;
    var alturaMenu = $('.navbar').outerHeight(true);
    if ($(window).scrollTop() >= alturaHeader){
        $('.navbar').addClass('fixed');
        $('.container').css('margin-top', (alturaMenu) + 'px');
    } else {
        $('.navbar').removeClass('fixed');
        $('.container').css('margin-top', '0');
    }
}
// Función para cambiar tema en el submenú cuando se haga scroll
function subMenuChange() {
    var arrayElems = document.getElementsByClassName("menu_elem");
    var newElems = [];
    $.each(arrayElems, (idx, elem) => {
        newElems.push(elem);
    });
    if (newElems.length) {
        var posicionActual = $(window).scrollTop();
        var resp = newElems.some((elem, idx, arr) => {
            elem = $(elem);
            var elemNext = $(arr[idx+1]);
            var top = elem.offset().top-140;
            var bottom = (elem.offset().top-140)+elem.outerHeight(true);
            if (idx<arr.length-1) {// Validar si la posición actual es menos a la últma posición del arreglo
                var topNext = elemNext.offset().top-140;
                // var bottomNext = (elemNext.offset().top-140)+elemNext.outerHeight(true);
                if (posicionActual>=top&&posicionActual<topNext) {
                    $("#sticky-sidebar").find("a.active").removeClass("active text-white bg-success").addClass("text-success");
                    $("#sticky-sidebar").find("a").eq(idx).removeClass("text-success").addClass("active text-white bg-success");
                    return true;
                }
            } else {
                if (posicionActual>=top&&posicionActual<bottom) {
                    $("#sticky-sidebar").find("a.active").removeClass("active text-white bg-success").addClass("text-success");
                    $("#sticky-sidebar").find("a").eq(idx).removeClass("text-success").addClass("active text-white bg-success");
                    return true;
                }
            }
            return false;
        });
        if (resp!==true) $("#sticky-sidebar").find("a.active").removeClass("active text-white bg-success").addClass("text-success");
    }
}
// Función para hacer scroll
function doScroll(elem) {
    $("body,html").animate({ scrollTop: $(elem).offset().top-139 }, 1000);
}
// Función para acomodar elementos
function whenResize() {
    if ($(".row_responsive").length) {
        var width = $(window).outerWidth(true);
        var elem = $(".row_responsive").find(".col_responsive");
        if (width<=349) {
            if (!elem.hasClass("col-12")) {
                elem.removeClass("col-4 col-6 col-10").addClass("col-12");
            }
        } else if (width<=767) {
            if (!elem.hasClass("col-10")) {
                elem.removeClass("col-4 col-6 col-12").addClass("col-10");
            }
        } else if (width<=991) {
            if (!elem.hasClass("col-6")) {
                elem.removeClass("col-4 col-10 col-12").addClass("col-6");
            }
        } else {
            if (!elem.hasClass("col-4")) {
                elem.removeClass("col-6 col-10 col-12").addClass("col-4");
            }
        }
    }
}
//Función para mostrar ventana alertify
function verPDF(path) {
    alertify.ContentDialog || alertify.dialog('ContentDialog', function() {
        var embed;
        return {
            main: function(path) {
                //set the path setting and return current instance for chaining.
                return this.set({ 
                    'path': path
                });
            },
            // we only want to override two options (padding and overflow).
            setup: function() {
                return {
                    buttons:[
                        {
                            text: "Aceptar!",
                            key: 27,/*Esc*/
                            className: alertify.defaults.theme.ok
                        }
                    ],
                    focus: {
                        element: 0
                    },
                    options: {
                        //disable both padding and overflow control.
                        maximizable: false,
                        padding : !1,
                        overflow: !1,
                    }
                };
            },
            // This will be called once the DOM is ready and will never be invoked again.
            // Here we create the iframe to embed the content.
            build: function() {           
                // create the iframe element
                embed = document.createElement('embed');
                embed.frameBorder = "no";
                embed.width = "100%";
                embed.height = "100%";
                // add it to the dialog
                this.elements.content.appendChild(embed);

                //give the dialog initial height (half the screen height).
                this.elements.body.style.minHeight = screen.height * .5 + 'px';
            },
            // dialog custom settings
            settings: {
                path: undefined
            },
            // listen and respond to changes in dialog settings.
            settingUpdated: function(key, oldValue, newValue) {
                switch (key) {
                    case 'path':
                        embed.src = newValue;
                        break;
                }
            },
            // listen to internal dialog events.
            hooks: {
                // triggered when a dialog option gets update.
                // warning! this will not be triggered for settings updates.
                onshow: function() {
                    alertify.message("¡Presione ESC para salir!", 10);
                },
                onupdate: function(option,oldValue, newValue) {
                    switch (option) {
                        case 'resizable':
                            if (newValue) {
                                this.elements.content.removeAttribute('style');
                                embed && embed.removeAttribute('style');
                            } else {
                                this.elements.content.style.minHeight = 'inherit';
                                embed && (embed.style.minHeight = 'inherit');
                            }
                        break;    
                    }    
                },
                onclose: function() {
                    alertify.dismissAll();
                }
            }
        };
    });
    //show the dialog
    alertify.ContentDialog(path).set({frameless: false, title:"Infografía"}).maximize();
}
alertify.defaults.theme.ok = "btn btn-success";
alertify.defaults.theme.cancel = "btn btn-danger";
alertify.defaults.theme.input = "form-control";
// Ejecutar cuando la ventana haga scroll
$(window).scroll(function() {    
    posicionarMenu();
    if ($(this).scrollTop() > 0) {
        $(".ir-arriba").slideDown(600);
    } else {
        $(".ir-arriba").slideUp(600);
    }
    subMenuChange();
});
// Ejecutar cuando la ventana se redimensione
$(window).resize(() => {
    whenResize();
});
// Ejecutar cuando la página cargue
document.addEventListener("DOMContentLoaded", () => {
    whenResize();
    $(".container").click(() => {
        if ($("#navbarText").hasClass("show")) {
            $("#navbarText").removeClass("show");
        }
    });
    $('.ir-arriba').click(() => {
        $("body,html").animate({ scrollTop: '0px' }, 1000);
    });
});