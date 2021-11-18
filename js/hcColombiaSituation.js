var data = [
    {
        name: 'Activos',
        y: matrizCasosJs["Activos"],
        color: '#007bff',
        sliced: true,
        selected: true
    },
    {
        name: 'Fallecidos',
        y: matrizCasosJs["Muertos"],
        color: '#dc3545',
    },
    {
        name: 'Recuperados',
        y: matrizCasosJs["Recuperados"],
        color: '#28a745',
    },
];
var sum = matrizCasosJs["Activos"]+matrizCasosJs["Muertos"]+matrizCasosJs["Recuperados"];
Highcharts.chart('container', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        }
    },
    title: {
        text: `${destino}: Morbilidad, Mortalidad y Recuperados`
    },
    subtitle: {
        text: `Total casos: ${sum}`
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    tooltip: {
        headerFormat: '<b>{point.key}</b><br>',
        pointFormat: 'Casos: <b>{point.y}</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
                enabled: true,
                format: '{point.percentage:.2f} %'
            },
            showInLegend: true
        }
    },
    series: [{
        type: 'pie',
        name: 'Casos',
        data: data
    }]
});