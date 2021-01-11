import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';


interface IChartProps {
    irelandData: [number, number][];
    ukData: [number, number][];
    name: string;
    title?: string;
    xLabel?: string;
    color?: string;
}
const UKAndIrelandChart = ({ irelandData, ukData, name, xLabel, title, color }: IChartProps) => {
    const mergedData = ukData.map((d, index) => {
        let value = d[1];
        let ireValue = 0;
        if (irelandData.length > index) {
            value += irelandData[index][1];
            ireValue = irelandData[index][1];
        }
        return {
            x: d[0],
            y: value,
            ireland: ireValue,
            uk: d[1]
        };
    })
    const chartOptions: Highcharts.Options | {} = {
        title: title,
        caption: title,
        chart: {
            backgroundColor: "none",
            height: "230px",
            borderWidth: 1,
            borderColor: "#333",
            width: null
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: true,
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
                return `<div class='charttooltip'>
                    <b>${moment(p.x).format('MMM Do YYYY')}</b>
                    <br/>${name}:<b>${p.y}</b>
                    <br/>UK:${p.point.options["uk"]}
                    <br/>Ireland:${p.point.options["ireland"]}</div>
                    `;
            }
        },
        series: [{
            type: 'spline',
            color: color ? color : 'rgb(200,200,0)',
            lineWidth: 1,
            marker: {
                enabled: false,
            },
            threshold: null,
            name,
            connectNulls: true,
            states: {
                hover: {
                    enabled: true
                }
            },
            data: mergedData
        }]
    }

    return <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
    />
}

export default UKAndIrelandChart;