import React from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import MapData from "@highcharts/map-collection/custom/british-isles.geo.json"
import { ICovidDaily, ICovidDailyData } from "../../types";
import moment from "moment";

require("highcharts/modules/map")(Highcharts);

function formatOnEmpty(value?: number): string {
    if (value && value > 0) {
        return `${value}`;
    }
    return "#";
}
const getOptions = (data, onSelect): Highcharts.Options | {} => {
    const series: Array<Highcharts.SeriesOptionsType | {}> = [
        {
            name: 'Countries',
            showInLegend: false,
            data: [
                { 'hc-key': 'gb-eng', id: 'gb-eng', color: '#222', z: 'gb-eng' },
                { 'hc-key': 'gb-wls', id: 'gb-wls', color: '#222', z: 'gb-wls' },
                { 'hc-key': 'gb-sct', id: 'gb-sct', color: '#222', z: 'gb-sct' },
                { 'hc-key': 'gb-nir', id: 'gb-nir', color: '#222', z: 'gb-nir' },
                { 'hc-key': 'ie-irl', id: 'ie-irl', color: '#222', z: 'ie-irl' },
                { 'hc-key': 'gb-imn', id: 'gb-imn', color: '#222', z: 'gb-imn' },
            ],
            enableMouseTracking: false

        },
        {
            data: data,
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
            joinBy: ['hc-key', 'hc-key'],
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
    data: ICovidDailyData;
    onChangeSelectedRegion: any;
}
const MapCases = ({ data, onChangeSelectedRegion }: IMapCasesProps) => {

    var statsData = data && [
        { 'hc-key': 'gb-eng', z: data.eng.CumCases, data: data.eng, id: 'gb-eng' },
        { 'hc-key': 'gb-wls', z: data.wls.CumCases, data: data.wls, id: 'gb-wls' },
        { 'hc-key': 'gb-sct', z: data.sct.CumCases, data: data.sct, id: 'gb-sct' },
        { 'hc-key': 'gb-nir', z: data.nir.CumCases, data: data.nir, id: 'gb-nir' },
        { 'hc-key': 'ie-irl', z: data.irl.CumCases, data: data.irl, id: 'ie-irl' }
    ];
    return <div style={{ width: '100%', margin: 0, padding: 0, }}>
        <HighchartsReact
            highcharts={Highcharts}
            options={getOptions(statsData, onChangeSelectedRegion)}
            constructorType={'mapChart'}
        />
    </div>
}

export default MapCases;