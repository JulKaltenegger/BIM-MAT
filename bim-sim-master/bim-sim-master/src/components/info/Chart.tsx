import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import { SensorData } from './Picked'

interface ChartData {
    id: string | null
    data: SensorData[]
}

export default function Chart(item: ChartData) {

    const [data, setData] = useState({})

    useEffect(() => {
        setData({
            type: 'scatter',
            mode: 'lines+markers',
            x: item.data.map(d => d.timestamp),
            y: item.data.map(d => d.value),
        } as Plotly.Data)
    }, [item.data])

    return (
        <Plot
            data={[data]}
            layout={{
                title: item.id ? item.id : '',
                height: 400,
                width: 600,
                margin: { pad: 0, l: 30, r: 30, b: 0 },
                plot_bgcolor: 'rgba(255,255,255,0.2)',
                paper_bgcolor: 'rgba(255,255,255,0.2)',
                yaxis: {
                    autorange: true,
                    type: 'linear',
                    rangemode: 'tozero'
                },
                xaxis: {
                    rangeslider: {},
                    rangemode: 'tozero'
                }
            }}
            config={{
                toImageButtonOptions: {
                    format: 'svg',
                    filename: 'picked',
                    // height: 400,
                    // width: 600,
                    scale: 1
                },
                scrollZoom: false
            }}
        />
    )
}
