import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Coins from './Coins'
import Coin from './Coin'
import Price from './Price'
import Chart from './Chart'

interface IRouterProps {}
const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {/* :coinId는 동적 경로 매개변수: 어떤 값을 입력하냐에 따라 URL이 동적으로 바뀜 */}
        <Route path="/:coinId" element={<Coin />}>
          {/* 중첩된 라우트 구현 */}
          <Route path="price" element={<Price />} />
          <Route path="chart" element={<Chart />} />
        </Route>
        <Route path="/" element={<Coins />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
