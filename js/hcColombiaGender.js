var data = [
    {
        name: 'Femenino',
        y: matrizGeneroJs["F"]["ACTIVOS"]+matrizGeneroJs["F"]["MUERTOS"]+matrizGeneroJs["F"]["RECUPERADOS"],
        color: '#9239BE',
        info: {
            "Activos": matrizGeneroJs["F"]["ACTIVOS"],
            "Fallecidos": matrizGeneroJs["F"]["MUERTOS"],
            "Recuperados": matrizGeneroJs["F"]["RECUPERADOS"],
            "Total": matrizGeneroJs["F"]["TOTAL"]
        }
    },
    {
        name: 'Masculino',
        y: matrizGeneroJs["M"]["ACTIVOS"]+matrizGeneroJs["M"]["MUERTOS"]+matrizGeneroJs["M"]["RECUPERADOS"],
        color: '#FF8B00',
        info: {
            "Activos": matrizGeneroJs["M"]["ACTIVOS"],
            "Fallecidos": matrizGeneroJs["M"]["MUERTOS"],
            "Recuperados": matrizGeneroJs["M"]["RECUPERADOS"],
            "Total": matrizGeneroJs["M"]["TOTAL"]
        }
    }
];
Highcharts.chart('container', {
    title: {
        text: `${destino}: Distribución por Género`,
        align: 'center',
        // verticalAlign: 'middle',
        // y: 50
    },
    subtitle: {
        text: `Total casos: ${matrizGeneroJs["F"]["TOTAL"]+matrizGeneroJs["M"]["TOTAL"]}`
    },
    tooltip: {
        headerFormat: '<b>{point.key}</b><br>',
        pointFormat: '<span style="color: #007bff; font-weight: bold;">Activos: <b>{point.info.Activos}</b></span><br><span style="color: #dc3545; font-weight: bold;">Fallecidos: <b>{point.info.Fallecidos}</b></span><br><span style="color: #28a745; font-weight: bold;">Recuperados: <b>{point.info.Recuperados}</b><br><b>Total: {point.info.Total}</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                distance: -35,
                style: {
                    fontWeight: 'bold',
                    color: 'white'
                },
                pointFormat: `<label style="text-align: center;">{point.name}<br>{point.percentage:.2f}%</label>`
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
            size: '110%'
        }
    },
    series: [{
        type: 'pie',
        name: 'Casos',
        innerSize: '50%',
        data: data
    }]
});