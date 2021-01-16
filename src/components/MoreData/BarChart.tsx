import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { CasesByAge } from '../../types';


interface IChartProps {
    femaleData: CasesByAge[];
    maleData: CasesByAge[];

}
const BarChart = ({ femaleData, maleData }: IChartProps) => {
    const series: any[] = [];
    for (const c of maleData) {
        const cF = femaleData.find((f) => f.age === c.age);
        series.push({
            minAge: Number.parseInt(c.age.split('_to_')[0]),
            name: c.age.replaceAll('_', ' ') + ' years',
            data: [c.value, cF?.value],
        })
    }
    series.sort((a, b) => a.minAge - b.minAge);
    const chartOptions: Highcharts.Options | {} = {
        title: 'Cases by age and gender',
        caption: undefined,
        chart: {
            backgroundColor: "none",
            type: 'column',
            width: null,
        },
        credits: {
            enabled: false
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts?.defaultOptions?.legend?.backgroundColor || '#FFFFFF',
            shadow: true
        },
        xAxis: {
            visible: true,
            categories: ['Male', 'Female'],
        },
        yAxis: {
            visible: true,
            gridLineWidth: 0,
            title: {
                text: 'Cases',
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
                const p: any = this;
                return `<div class='charttooltip'>${p.series.name}<br/>Number of cases for ${p.x}s: ${p.y}</div>`;
            }
        },
        series,
    }
    return <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
    />
}

export default BarChart;