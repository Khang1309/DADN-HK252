import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import * as z from 'zod'

interface LineChartProps {
    option: echarts.EChartsOption;
    width?: string;
    height?: string;
}

const MyLineChart: React.FC<LineChartProps> = ({
    option,
    width = '100%',
    height = '400px'
}) => {
    // 1. Create a reference to the DOM element
    const chartRef = useRef(null);

    useEffect(() => {
        // 2. Initialize the chart using the ref
        // We check if it's already initialized to avoid warnings during development (Strict Mode)
        let myChart = echarts.getInstanceByDom(chartRef.current);
        if (!myChart) {
            myChart = echarts.init(chartRef.current);
        }

        // 3. Set the provided option
        myChart.setOption(option);

        // 4. Handle window resizing to keep the UI responsive
        const handleResize = () => {
            myChart.resize();
        };
        window.addEventListener('resize', handleResize);

        // 5. Cleanup function: destroy the chart when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
            myChart.dispose();
        };
    }, [option]); // Re-render when option changes

    // 6. Render the container. ECharts MUST have an explicit width and height!
    return <div ref={chartRef} style={{ width, height }} />;
};

export default MyLineChart;