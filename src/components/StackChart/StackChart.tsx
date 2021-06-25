import React from 'react';
import { Props } from './types';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import getUniqueChannels, { getSalesData } from '../../utils/utils';

const ChartColors = ["#54A3CD","#C31F46", "#636568", "#ACC337","#F3CE3B"];

const StackChart:React.FC<Props> = (props) =>{
    const chart = React.useRef(null as any);

    const initChart = (containerId:string) =>{
        let chartObj = am4core.create(containerId, am4charts.XYChart);
        
        chartObj.numberFormatter.numberFormat = "#.a";
        chartObj.dateFormatter.dateFormat = "d/M/yyyy";
        
        const title = chartObj.titles.create();
        title.text = "Sales Forecast in {insert/update market here} Market";
        title.fontSize = 20
        title.marginBottom = 10;
        
        const dateAxis = chartObj.xAxes.push(new am4charts.DateAxis());
        dateAxis.dateFormatter = new am4core.DateFormatter();
        dateAxis.dateFormats.setKey("day", "d/M/yyyy");
        dateAxis.renderer.minGridDistance = 80;
        dateAxis.baseInterval = {
            "timeUnit": "day",
            "count": 1
        } 
        
        let yAxis = chartObj.yAxes.push(new am4charts.ValueAxis());
        yAxis.numberFormatter.numberFormat = "#.a";

        const salseData = getSalesData();
        const dataset = getUniqueChannels(salseData);

        Object.keys(dataset).forEach((channel, index) =>{
            console.log(channel,dataset[channel]);
            const series = chartObj.series.push(new am4charts.LineSeries());
            series.dataFields.dateX = "period";
            series.dataFields.valueY = "sales";
            series.name= channel
            series.data = dataset[channel];
            
            series.tooltipHTML = "<span style='font-size:14px; color:#000000;'><b>{valueY.value}</b>{categoryX}</span>";
            series.tooltipText = "[#000]{categoryX}[/]";
            

            series.fillOpacity = 0.6;
            series.strokeWidth = 2;
            series.stroke = am4core.color(ChartColors[index]);
            series.fill = am4core.color(ChartColors[index]);
            series.stacked = true;
            series.yAxis = yAxis;
            series.xAxis = dateAxis;
            series.stacked = true;
        })
        chartObj.cursor = new am4charts.XYCursor();
        chartObj.cursor.xAxis = dateAxis;
        chartObj.scrollbarX = new am4core.Scrollbar();

        chartObj.legend = new am4charts.Legend();
        chartObj.legend.position = "top";

        chartObj.scrollbarX.disabled = true

        return chartObj;
    }

    React.useEffect(()=>{
        am4core.useTheme(am4themes_animated);
        let chartObj = initChart("chart-container")
        
        chart.current = chartObj;
        
        return ()=>{
            if(chartObj){
                chartObj.dispose();
            }
        }
    },[])

    return (
        <div id="chart-container" style={{width:"100%", height:"500px"}}></div>
    )

}

export default StackChart;