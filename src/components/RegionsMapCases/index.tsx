import React, { useEffect, useMemo, useRef } from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import MapData from "../../utla-geojson.json";
import { ICovidRegionsDailyDataByDate } from "../../types";
import moment from "moment";

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
            data,
            mapData: MapData,
            type: "map",
            name: 'Covid19 daily cases',
            cursor: 'pointer',
            minSize: "5%",
            maxSize: "10%",
            allowPointSelect: true,
            borderWidth: 1,
            borderColor: "#FFF",
            color: `rgb(200, 200,200)`,
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
            enabled: false,
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
                Date: d?.Date || new Date(),
                id: regionName,
            })
        }
        return dataMapped;
    }, [data]);
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

export default RegionsMapCases;