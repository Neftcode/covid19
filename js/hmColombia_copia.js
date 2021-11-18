// Prepare data
// Data is joined to map using value of 'hc-key' property by default.
// See API docs for 'joinBy' for more info on linking data and map.
var data = [
    ['co-88', 0],// San Andrés y Providencia | hc-key: co-sa
    ['co-19', 0],// Cauca | hc-key: co-ca
    ['co-52', 0],// Nariño | hc-key: co-na
    ['co-27', 0],// Chocó | hc-key: co-ch
    ['co-0', 0],// Sin definir | hc-key: co-3653
    ['co-73', 0],// Tolima | hc-key: co-to
    ['co-18', 0],// Caquetá | hc-key: co-cq
    ['co-41', 0],// Huila | hc-key: co-hu
    ['co-86', 0],// Putumayo | hc-key: co-pu
    ['co-91', 0],// Amazonas | hc-key: co-am
    ['co-13', 0],// Bolívar | hc-key: co-bl
    ['co-76', 0],// Valle del Cauca | hc-key: co-vc
    ['co-70', 0],// Sucre | hc-key: co-su
    ['co-8', 0],// Atlántico | hc-key: co-at
    ['co-20', 0],// Cesar | hc-key: co-ce
    ['co-44', 0],// La Guajira | hc-key: co-lg
    ['co-47', 0],// Magdalena | hc-key: co-ma
    ['co-81', 0],// Arauca | hc-key: co-ar
    ['co-54', 0],// Norte de Santander | hc-key: co-ns
    ['co-85', 0],// Casanare | hc-key: co-cs
    ['co-95', 0],// Guaviare | hc-key: co-gv
    ['co-50', 0],// Meta | hc-key: co-me
    ['co-97', 0],// Vaupés | hc-key: co-vp
    ['co-99', 0],// Vichada | hc-key: co-vd
    ['co-5', 0],// Antioquia | hc-key: co-an
    ['co-23', 0],// Córdoba | hc-key: co-co
    ['co-15', 0],// Boyacá | hc-key: co-by
    ['co-68', 0],// Santander | hc-key: co-st
    ['co-17', 0],// Caldas | hc-key: co-cl
    ['co-25', 0],// Cundinamarca | hc-key: co-cu
    ['co-11', 0],// Bogotá | hc-key: co-1136
    ['co-66', 0],// Risaralda | hc-key: co-ri
    ['co-63', 0],// Quindío | hc-key: co-qd
    ['co-94', 0]// Guainía | hc-key: co-gn
];
// Asignar valores
data.forEach((r, i) => {
    data[i][1] = (matrizDepartamentosJs[r[0]] ? matrizDepartamentosJs[r[0]] : 0);
});
// Create the chart
Highcharts.mapChart('container', {
    chart: {
        map: 'countries/co/co-all'
    },

    title: {
        text: 'Colombia: Casos Covid-19'
    },

    subtitle: {
        text: `Activos: 25000<br>Muertos: 479<br>Recup.: 2365<br>Total: 26000`
    },

    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'top'
        },
        enableDoubleClickZoomTo: true
    },

    legend: {
        alignColumns: true,
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'bottom',
        reversed: true
    },

    colorAxis: {
        min: 0,
        stops: [
            [0, '#EFEFFF'],
            [0.5, Highcharts.getOptions().colors[0]],
            [1, Highcharts.color(Highcharts.getOptions().colors[0]).brighten(-0.5).get()]
        ]
    },

    series: [{
        data: data,
        name: 'Total casos',
        states: {
            hover: {
                color: Highcharts.getOptions().colors[2]
            }
        },
        dataLabels: {
            enabled: true,
            format: '{point.name}'
        }
    }],

    tooltip: {
        formatter: function() {
            var string = "";
            if (this.point.value==1) {
                string = "caso";
            } else {
                string = "casos";
            }
            return '<span style="font-size: 11px;">' + this.series.name + '</span><br>' + this.point.name + ': <b>' + this.point.value + ' ' + string + '</b>';
        }
    }
});