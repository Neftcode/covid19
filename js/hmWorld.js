Highcharts.getJSON('../hm/samples/data/world-population-density.json', function (data) {
    // Prevent logarithmic errors in color calulcation
    data.forEach(function (p) {
        p.value = (matrizPaisesJs[p["code3"]] ? matrizPaisesJs[p["code3"]] : 0);
    });
    
    // Initiate the chart
    Highcharts.mapChart('container', {
    
        chart: {
            map: 'custom/world'
        },
        
        title: {
            text: "Colombia: Casos importados"
        },

        subtitle: {
            text: `Total de casos importados: ${totalCasos}`
        },
        
        legend: {
            alignColumns: true,
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'bottom',
            reversed: true
        },
        
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'top'
            },
            enableDoubleClickZoomTo: true
        },
        
        tooltip: {
            backgroundColor: 'none',
            borderWidth: 0,
            shadow: false,
            useHTML: true,
            padding: 0,
            pointFormat: '<span class="f32"><span class="flag {point.properties.hc-key}">' +
                        '</span></span> {point.name}<br>' +
                        '<span style="font-size:25px"><b>{point.value}</b></span>',
            positioner: function () {
                if ($("#container").width()<500) {
                  return { x: 70, y: 280};
                } else {
                  return { x: 70, y: $("#container").height()<=800 ? Math.ceil((70*$("#container").height())/100) : $("#container").height()-150};
                }
            },

            series: {

            }
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
            joinBy: ['iso-a3', 'code3'],
            name: 'Casos',
            states: {
                hover: {
                    color: Highcharts.getOptions().colors[2]
                }
            }
        }]

    });
});