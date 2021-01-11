import React from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import MapData from "@highcharts/map-collection/custom/british-isles.geo.json"

import { ICovidDailyData } from "../../types";

require("highcharts/modules/map")(Highcharts);

const getOptions = (data, onSelect): Highcharts.Options | {} => {
    const series: Array<Highcharts.SeriesOptionsType | {}> = [
        {
            name: 'Countries',
            showInLegend: false,
            data: [
                { 'hc-key': 'gb-eng',id: 'gb-eng', color: '#222', z: 'gb-eng' },
                { 'hc-key': 'gb-wls',id: 'gb-wls', color: '#222', z: 'gb-wls' },
                { 'hc-key': 'gb-sct',id: 'gb-sct', color: '#222', z: 'gb-sct' },
                { 'hc-key': 'gb-nir',id: 'gb-nir', color: '#222', z: 'gb-nir' },
                { 'hc-key': 'ie-irl',id: 'ie-irl', color: '#222', z: 'ie-irl' },
                { 'hc-key': 'gb-imn',id: 'gb-imn', color: '#222', z: 'gb-imn' },
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
            tooltip: {
                pointFormat: '{point.properties.name}: {point.z}  new cases'
            }
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
        { 'hc-key': 'gb-eng', z: data.eng.ActiveCases, data: data.eng, id: 'gb-eng' },
        { 'hc-key': 'gb-wls', z: data.wls.ActiveCases, data: data.wls, id: 'gb-wls' },
        { 'hc-key': 'gb-sct', z: data.sct.ActiveCases, data: data.sct, id: 'gb-sct' },
        { 'hc-key': 'gb-nir', z: data.nir.ActiveCases, data: data.nir, id: 'gb-nir' },
        { 'hc-key': 'ie-irl', z: data.irl.ActiveCases, data: data.irl, id: 'ie-irl' }
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