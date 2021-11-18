function sum(total, num) {
    return total+num;
}
var totalActivos = matrizEdadesJs["Activos"].reduce(sum);
var totalMuertos = matrizEdadesJs["Muertos"].reduce(sum);
var totalRecuperados = matrizEdadesJs["Recuperados"].reduce(sum);
var sum = totalActivos+totalMuertos+totalRecuperados;
Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: `${destino}: Distribución por Edad`
    },
    subtitle: {
        text: `Total casos: ${sum}`
    },
    xAxis: {
        categories: ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '>=90']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Porcentaje total casos'
        },
        
    },
    tooltip: {
        headerFormat: '<b>Edades {point.x}</b><br>',
        pointFormat: '<span style="color:{series.color}; font-weight: bold;">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.2f}%)<br>',
        shared: true
    },
    plotOptions: {
        column: {
            stacking: 'percent'
        }
    },
    series: [{
        name: 'Activos',
        color: '#007bff',
        data: matrizEdadesJs["Activos"]
    }, {
        name: 'Fallecidos',
        color: '#dc3545',
        data: matrizEdadesJs["Muertos"]
    }, {
        name: 'Recuperados',
        color: '#28a745',
        data: matrizEdadesJs["Recuperados"]
    }]
});