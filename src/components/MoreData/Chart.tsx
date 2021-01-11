import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';


interface IChartProps {
    data: any;
    name: string;
    regionName: string;
    range: string | number;
    xLabel?: string;
    title?: string;

}
const Chart = ({ data, name, range, xLabel, title }: IChartProps) => {
    const chartOptions: Highcharts.Options | {} = {
        title: title,
        caption: undefined,
        chart: {
            backgroundColor: "none",
            height: "170px",
            width: null
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false,
        },
        xAxis: {
            visible: true,
            type: 'datetime',
            width: "100%",
            gridLineWidth: 0,
        },
        yAxis: {
            visible: true,
            gridLineWidth: 0,
            title: {
                text: xLabel,
            }
        },
        plotOptions: {
            line: {
                marker: {
                    enabled: false
                }
            }
        },
        tooltip: {
            crosshairs: [false],
            backgroundColor: null,
            borderColor: null,
            borderWidth: 0,
            shadow: true,
            outside: true,
            distance: 10,
            useHTML: true,
            shape: 'square',
            formatter() {
                var p = this;
                return "<div class='charttooltip'><b>" + moment(p.x).format('MMM Do YYYY') + '</b><br/>' + name + ': <b>' + p.y + '</b></div>';
            }
        },
        series: [{
            type: range === "all" ? 'line' : 'spline',
            color: 'rgb(200,200,0)',
            name,
            lineWidth: 1,
            marker: {
                enabled: false,
            },
            threshold: null,
            connectNulls: true,
            states: {
                hover: {
                    enabled: true
                }
            },
            data
        }]
    }

    return <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
    />
}

export default Chart;