import { React } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

function getOptions(prices) {
    return {
        chart: {
            backgroundColor: {
                linearGradient: [0, 0, 500, 500],
                stops: [
                    [0, 'rgb(255, 255, 255)'],
                    [1, 'rgb(240, 240, 255)']
                ]
            },
        },
        title: {
            text: ''
        },
        xAxis: {
            dateFormat: 'dd/mm/YYYY',
        },
        yAxis: [{
            title: {
                text: 'Stock'
            },
            opposite: false
        }, {
            title: {
                text: 'Volume'
            }
        }],
        series: [{
            data: prices.map(x => [new Date(x.date).getTime(), Number(x.close)]),
            color: "red",
            name: "close"
        }, {
            data: prices.map(x => [new Date(x.date).getTime(), Number(x.volume)]),
            yAxis: 1,
            name: "volume"
        }]
    }
}

export default function PricesChart({ prices }) {
    console.log(prices)
    return (
        <HighchartsReact
            containerProps={{ style: { width: "100%" } }}
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={getOptions(prices)}
        />
    )
};