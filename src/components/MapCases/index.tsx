import React, { useEffect, useRef } from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import MapData from "@highcharts/map-collection/custom/british-isles.geo.json"
import { ICovidDaily, ICovidRegionsDailyData } from "../../types";
import moment from "moment";
import { DefaultDailly } from "../../constants";

require("highcharts/modules/map")(Highcharts);

function formatOnEmpty(value?: number | null): string {
    if (value && value > 0) {
        return `${value}`;
    }
    return "#";
}
const getOptions = (data, onSelect): Highcharts.Options | {} => {
    const series: Array<Highcharts.SeriesOptionsType | {}> = [
        {
            name: 'Countries',
            data: data && data.map((d) => ({ color: "#222", regionName: d.regionName })),
            showInLegend: false,
            joinBy: ['name', 'regionName'],
            enableMouseTracking: false
        },
        {
            data,
            type: "mapbubble",
            name: 'Covid19 daily cases',
            borderWidth: 0,
            cursor: 'pointer',
            minSize: "20%",
            maxSize: "50%",
            allowPointSelect: true,
            color: {
                radialGradient: { cx: 0.5, cy: 0.5 },
                stops: [
                    [0, 'red'], // start
                    [0.5, 'rgba(255,0,0,0.6)'], // middle
                    [1, 'rgba(255,100,100,0.2)'] // end
                ]
            },
            states: {
                select: {
                    borderWidth: 2,
                    borderColor: 'yellow'
                },
                inactive: {
                    color: '#ffffff'
                }
            },
            point: {
                events: {
                    select() {
                        const point = this;
                        onSelect(point.name);
                    }
                }
            },
            joinBy: ['name', 'regionName'],
        },
    ]
    return {
        chart: {
            borderWidth: 0,
            margin: [0, 40, 0, 40],
            map: MapData,
            plotShadow: false,
            borderRadius: 0,
            backgroundColor: {
                linearGradient: { x1: 0, y1: 1.0, x2: 0.0, y2: 0 },
                stops: [
                    [0, '#000101'], // start
                    [0.5, 'rgba(3, 14, 30, 1)'], // middle
                    [1, '#030e1e'] // end
                ]
            },
        },
        title: {
            text: ''
        },
        tooltip: {
            crosshairs: [false],
            backgroundColor: null,
            borderColor: null,
            borderWidth: 0,
            shadow: true,
            outside: true,
            distance: 30,
            useHTML: true,
            shape: 'square',
            formatter() {
                const { point } = this;
                const data: ICovidDaily = (point as any).data;
                return `<div class='mapTooltip'>
                <div class='mapTooltip-name'>${point.name}:</div> <ul>
                <li><span class='mapTooltip-value'>${formatOnEmpty(data.ActiveCases)}</span> <b>Active Cases</b></li>
                <li><span class='mapTooltip-value'>${formatOnEmpty(data.CumCases)}</span> <b>Cases</b></li>
                <li><span class='mapTooltip-value'>${formatOnEmpty(data.NewCases)}</span> <b>New Cases</b></li>
                <li><span class='mapTooltip-value'>${formatOnEmpty(data.CumDeaths)}</span> <b>Deaths</b></li>
                <li><span class='mapTooltip-value'>${formatOnEmpty(data.NewDeaths)}</span> <b>New Deaths</b></li>
                <li><span class='mapTooltip-value'>${formatOnEmpty(data.Recovered)}</span> <b>Recovered</b></li>
                </ul>
                <div class='mapTooltip-date'>${moment(data.Date).format("DD MMM YYYY")}</div>
                <div class='mapTooltip-note'># = Data not available</div>
                </div>`;
            }
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'middle',
                alignTo: 'plotBox',
                align: 'right'
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false,
        },
        series: data ? series : [series[0]]
    }
}

interface IMapCasesProps {
    data: ICovidRegionsDailyData;
    onChangeSelectedRegion: any;
    dateIndex: number;
    status: string;
}
const MapCases = ({ data, onChangeSelectedRegion, dateIndex, status }: IMapCasesProps) => {
    const chartRef = useRef(null);
    const statsData: { regionName: string, z: number | null, data: ICovidDaily, id: string }[] = [];
    for (const [regionName, list] of Object.entries(data)) {
        const currentElement: ICovidDaily = list && list.length > dateIndex ? list[dateIndex] : (DefaultDailly);
        statsData.push({
            regionName: regionName,
            z: currentElement.CumCases || null,
            data: currentElement,
            id: regionName,
        })
    }
    useEffect(() => {
        const chart: any = chartRef?.current;
        if (status !== 'success') {
            chart.chart.showLoading();
        } else {
            chart.chart.hideLoading();
        }
    }, [status])
    return <div style={{ width: '100%', margin: 0, padding: 0, }}>
        <HighchartsReact
            highcharts={Highcharts}
            options={getOptions(statsData, onChangeSelectedRegion)}
            constructorType={'mapChart'}
            ref={chartRef}
        />
    </div>
}

export default MapCases;