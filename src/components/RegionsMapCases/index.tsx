import React, { useEffect, useMemo, useRef, useState } from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { ICovidRegionsDailyDataByDate } from "../../types";
import moment from "moment";
import Loader from "../loader";

require("highcharts/modules/map")(Highcharts);

function formatOnEmpty(value?: number | null): string {
    if (value && value > 0) {
        return `${value}`;
    }
    return "#";
}
const getOptions = (data, onSelect, mapData): Highcharts.Options | {} => {
    const series: Array<Highcharts.SeriesOptionsType | {}> = [
        {
            data,
            mapData,
            type: "map",
            name: 'Covid19 daily cases',
            cursor: 'pointer',
            minSize: "5%",
            maxSize: "10%",
            allowPointSelect: true,
            borderWidth: 1,
            borderColor: "#FFF",
            states: {
                select: {
                    borderWidth: 2,
                    borderColor: '#222',
                    color: '#444'
                },
                hover: {
                    color: '#111'
                }
            },
            point: {
                events: {
                    select() {
                        const point: any = this;
                        onSelect(point.id);
                    },
                },
            },
            joinBy: ['code', 'regionCode'],
        },
    ]
    return {
        chart: {
            borderWidth: 0,
            margin: [0, 40, 0, 40],
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
        colorAxis: {
            dataClasses: [{
                name: "No Data for the specified date",
                to: 0
            }, {
                from: 0,
                to: 1000
            }, {
                from: 1000,
                to: 10000
            }, {
                from: 10000,
                to: 20000
            }, {
                from: 20000,
                to: 30000
            },
            {
                from: 30000,
                to: 40000
            },
            {
                from: 40000,
                to: 50000
            },
            {
                from: 50000,
                to: 60000
            },
            {
                from: 50000,
            }]
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
                const { point }: any = this;
                return `<div class='mapTooltip'>
                <div class='mapTooltip-name'>${point.AreaName}:</div> <ul>
                <li><span class='mapTooltip-value'>${formatOnEmpty(point.CumCases)}</span> <b>Cases</b></li>
                <li><span class='mapTooltip-value'>${formatOnEmpty(point.ActiveCases)}</span> <b>Active Cases</b></li>
                <li><span class='mapTooltip-value'>${formatOnEmpty(point.CumDeaths)}</span> <b>Deaths</b></li>
                </ul>
                <div class='mapTooltip-date'>${moment(point.Date).format("DD MMM YYYY")}</div>
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
            title: {
                text: 'Number of cases',
                style: {
                    color: ( // theme
                        Highcharts.defaultOptions &&
                        Highcharts.defaultOptions.legend &&
                        Highcharts.defaultOptions.legend.title &&
                        Highcharts.defaultOptions.legend.title.style &&
                        Highcharts.defaultOptions.legend.title.style.color
                    ) || 'black'
                }
            },
            align: 'left',
            verticalAlign: 'bottom',
            floating: true,
            layout: 'vertical',
            valueDecimals: 0,
            backgroundColor: ( // theme
                Highcharts.defaultOptions &&
                Highcharts.defaultOptions.legend &&
                Highcharts.defaultOptions.legend.backgroundColor
            ) || 'rgba(255, 255, 255, 0.85)',
            symbolRadius: 0,
            symbolHeight: 14
        },
        series: data ? series : [series[0]]
    }
}

interface IMapCasesProps {
    data: ICovidRegionsDailyDataByDate;
    onChangeSelectedRegion: any;
    status: string;
}

const RegionsMapCases = ({ data, onChangeSelectedRegion, status }: IMapCasesProps) => {
    const chartRef = useRef(null);
    const [mapData, setMapData] = useState<any>(null);
    const statsData = useMemo(() => {
        const dataMapped: {}[] = [];
        for (const [regionName, d] of Object.entries(data)) {
            dataMapped.push({
                regionCode: d?.AreaCode || '',
                z: d?.CumCases || null,
                CumDeaths: d?.CumDeaths || null,
                CumCases: d?.CumCases || null,
                ActiveCases: d?.ActiveCases || null,
                AreaName: regionName,
                value: d?.CumCases || null,
                Date: d?.Date || new Date(),
                id: regionName,
            })
        }
        return dataMapped;
    }, [data]);
    useEffect(() => {
        const chart: any = chartRef?.current;
        if (status !== 'success' && chart?.chart) {
            chart.chart.showLoading();
        } else if (chart?.chart) {
            chart.chart.hideLoading();
        }
    }, [status]);
    useEffect(() => {
        (async function () {
            const mapD = await import('../../utla-geojson.json');
            setMapData(mapD.default);
        })();
    }, []);
    return <div style={{ width: '100%', margin: 0, padding: 0, minHeight: 500 }}>
        <Loader status={mapData ? 'success' : 'loading'}>
            <HighchartsReact
            highcharts={Highcharts}
            options={getOptions(statsData, onChangeSelectedRegion, mapData)}
            constructorType={'mapChart'}
            ref={chartRef}
        /></Loader>
    </div>
}

export default RegionsMapCases;