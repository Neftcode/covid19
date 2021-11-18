var chart = Highcharts.chart('container', {
    chart: {
        zoomType: 'x'
    },
    title: {
        text: `${destino}: Casos Diarios`
    },
    subtitle: {
        text: document.ontouchstart === undefined ? 'Haga clic y arrastre en el área de trazado para ampliar' : 'Seleccione el gráfico para ampliar'
    },
    xAxis: {
        labels: {
            // rotation: 90,
            formatter: function() {
                return moment(this.value, 'X').format("MMM DD");
            }
        },
        type: 'datetime'
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Número de casos'
        }
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        area: {
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
            marker: {
                radius: 2
            },
            lineWidth: 1,
            states: {
                hover: {
                    lineWidth: 1
                }
            },
            threshold: null
        }
    },
    series: [{
        type: 'area',
        name: 'Casos reportados',
        data: matrizCurvaJs
    }],
    tooltip: {
        formatter: function() {
            return `<span style='font-size: 11px;'><b>${moment(this.x, 'X').format("dddd, MMM DD, YYYY")}</b></span><br><span style="color:${this.color}">●</span> Casos reportados: <b>${this.y}</b><br/>`;
        }
    },
});