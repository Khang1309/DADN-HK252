import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

interface EChartsWrapperProps {
  option: echarts.EChartsOption
  width?: string
  height?: string
  className?: string
}

export default function EChartsWrapper({
  option,
  width = '100%',
  height = '400px',
  className,
}: EChartsWrapperProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    let myChart = echarts.getInstanceByDom(chartRef.current)
    if (!myChart) {
      myChart = echarts.init(chartRef.current)
    }

    myChart.setOption(option)

    const handleResize = () => {
      myChart.resize()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      myChart.dispose()
    }
  }, [option])

  return (
    <div
      ref={chartRef}
      style={{ width, height }}
      className={className}
    />
  )
}
