import { Routes, Route } from 'react-router-dom'
import { Main } from '../pages/main/Main'
import { ChartForecast5Days } from '../pages/chartPage/chartForecast5Days'

export const MainLayout = () => {
  return (
    <>
        <Routes>
            <Route path={'/'} element={<Main />} />
            <Route path={'/chart'} element={<ChartForecast5Days />} />
        </Routes>
    </>
  )
}