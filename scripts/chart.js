$(function () {
    Highcharts.setOptions({
        colors: ['#9EC3D5', '#F0733C', '#F7AB42', '#FCC843', '#87AC89', '#BBBDC0', '#51A6B9']
    });
    window.options = {
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        chart: {
            backgroundColor: 'transparent'
        },
        tooltip: {
            borderWidth: 3,
            shadow: false,
            style: {
                padding: 10
            },
            formatter: function () {
                return '<span style="font-weight: bold; font-size: 1.3em;">' + Highcharts.numberFormat(this.percentage, 1) +'%</span><br><span style="font-weight: bold; font-size: 1.1em;">' + this.point.name + '</span><br><span style="font-size: 1em;">' + this.point.myData + '</span></span>';
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Spirit Animals',
            innerSize: '50%',
            data: [
                {
                    name: 'Dung Beetle',
                    myData: 'helloooo'
                },
                {
                    name: 'Hummingbird',
                    myData: 'helloooo'
                },
                {
                    name: 'Angler Fish', 
                    myData: 'helloooo'
                },
                {
                    name: 'Manatee',
                    sliced: true,
                    selected: true,
                    myData: 'helloooo'
                },
                {
                    name: 'Mandrill',
                    myData: 'helloooo'
                },
                {
                    name: 'Okapi',
                    myData: 'helloooo'
                },
                {
                    name: 'Three-Toed Sloth',
                    myData: 'helloooo'
                }
            ]
        }]
    }
});
