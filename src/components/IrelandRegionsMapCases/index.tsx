import React, { useEffect, useMemo, useRef } from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { ICovidRegionsDailyDataByDate } from "../../types";
import Loader from "../loader";
import MapData from "@highcharts/map-collection/countries/ie/ie-all.geo.json"
import { Paper } from "@material-ui/core";

require("highcharts/modules/map")(Highcharts);


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
            joinBy: ['name', 'regionCode'],
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
                name: "No Data",
                to: 0
            }, {
                from: 0,
                to: 100
            }, {
                from: 100,
                to: 200
            }, {
                from: 200,
                to: 300
            }, {
                from: 300,
                to: 400
            },
            {
                from: 400,
                to: 500
            },
            {
                from: 500,
                to: 600
            },
            {
                from: 600,
                to: 700
            },
            {
                from: 700,
                to: 800
            },
            {
                from: 800,
                to: 900
            },
            {
                from: 900,
                to: 1000
            },
            {
                from: 1000,
                to: 2000
            },
            {
                from: 2000,
                to: 3000
            },
            {
                from: 3000,
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
                <div class='mapTooltip-name'>${point.AreaName}:</div>
                <div>Click to load data</div>
                </div>`;
            }
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {

                verticalAlign: 'top',
                alignTo: 'spacingBox',
                align: 'right'
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            title: {
                text: 'Number of new cases',
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
            align: 'right',
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
    selectedRegion: string;
    cases: string;
    deaths: string;
    casesRate: string;
    deathRate: string;
}

const RegionsMapCases = ({ data, onChangeSelectedRegion, status, cases, deaths, selectedRegion, casesRate, deathRate }: IMapCasesProps) => {
    const chartRef = useRef(null);
    const statsData = useMemo(() => {
        const dataMapped: {}[] = [];
        for (const [regionName, d] of Object.entries(data)) {
            dataMapped.push({
                regionCode: d?.AreaCode || '',
                z: d?.CumCases || null,
                AreaName: regionName,
                value: d?.CumCases || null,
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

    return <div style={{ width: '100%', margin: 0, padding: 0, minHeight: 500 }}>
        <Paper variant="elevation" elevation={3} style={{ padding: 10, backgroundColor: '#1F1F1F', color: "#EEE", position: 'absolute', display: 'inline-block', zIndex: 1, margin: 10 }}>
            <Loader status={status}>
                <div style={{ color: "#F5F577", fontWeight: "bold", textTransform: 'uppercase', fontSize: 18 }}>{selectedRegion}</div>
                <div style={{ fontSize: 12 }}>Cases: <span style={{ color: "#F5F577" }}>{cases}</span></div>
                <div style={{ fontSize: 12 }}>Rate of cumulative cases per 100k resident population: <span style={{ color: "#F5F577" }}>{casesRate}</span></div>
                <div style={{ fontSize: 12 }}>Rate of cumulative deaths per 100k resident population: <span style={{ color: "#F5F577" }}>{deathRate}</span></div>
            </Loader>
        </Paper>
        <HighchartsReact
            highcharts={Highcharts}
            options={getOptions(statsData, onChangeSelectedRegion)}
            constructorType={'mapChart'}
            ref={chartRef}
        />
    </div>
}

export default RegionsMapCases;