import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { fetchCoinHistory } from './api'
import ReactApexChart from 'react-apexcharts'
import { Helmet } from 'react-helmet-async'
import { useRecoilValue } from 'recoil'
import { isDarkAtom } from '../atoms'

export interface IHistorical {
  time_open: string
  time_close: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  market_cap: number
}

const Chart = () => {
  // isDarkAtom은 boolean값도 반환, value를 가져옴
  const isDark = useRecoilValue(isDarkAtom)
  const { coinId } = useParams()
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['chart', coinId],
    () => fetchCoinHistory(coinId as string)
    // {
    //   refetchInterval: 10000, // 차트를 10초마다 업데이트
    // }
  )
  return (
    <div>
      <Helmet>
        <title>Chart</title>
      </Helmet>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ReactApexChart
          type="line"
          series={[
            {
              name: 'price',
              data:
                data?.map(price => ({
                  x: price.time_close,
                  y: [price.open, price.high, price.low, price.close],
                })) || [],
            },
          ]}
          // 차트 스타일을 찾기 힘들다면 demo를 참고해서 만들기
          options={{
            theme: {
              mode: isDarkAtom ? 'dark' : 'light',
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            grid: { show: false },
            stroke: {
              curve: 'smooth',
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: 'datetime',
              categories: data?.map(price => price.time_close),
            },
            fill: {
              type: 'gradient',
              gradient: { gradientToColors: ['#0be881'], stops: [0, 100] },
            },
            colors: ['#0fbcf9'],
            tooltip: {
              y: {
                formatter: value => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  )
}

export default Chart
