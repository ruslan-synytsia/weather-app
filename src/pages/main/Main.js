import style from './Main.module.css'
import { Welcome } from '../../components/welcome/Welcome'
import { CurrentWeatherForecast } from '../../components/currentWeatherForecast/CurrentWeatherForecast'
import { DailyWeatherForecast } from '../../components/dailyWeatherForecast/DailyWeatherForecast'
import { WeatherForecast5Days } from '../../components/weatherForecast5Days/WeatherForecast5Days'
import { SummaryInfo } from './../../components/summaryInfo/summaryInfo'
import { fetchGetData } from '../../store/weatherDataSlice'
import { useDispatch, useSelector } from 'react-redux'
import { groupByDates } from '../../components/functions/groupByDates/groupByDates'

export const Main = () => {
    const dispatch = useDispatch()

    const weatherData = useSelector(state => state.weatherData.data)
    const error = useSelector(state => state.weatherData.error)

    const setData = (data) => dispatch(fetchGetData(data))

    if (weatherData === null) return <Welcome setData={setData} />

    const currentData = {
        setData,
        cityName: weatherData.city.name,
        description: weatherData.list[0].weather[0].description,
        temp: Math.round(weatherData.list[0].main.temp),
        error
    }

    const dailyData = {
        date: new Date(),
        tempMin: Math.round(weatherData.list[0].main.temp_min),
        tempMax: Math.round(weatherData.list[0].main.temp_max),
        list: weatherData.list,
        error
    }

    const fiveDaysData = {
        list: groupByDates(weatherData.list),
        error
    }

    const summaryData = {
        summary: {
            sunrise: weatherData.city.sunrise, 
            sunset: weatherData.city.sunset, 
            windSpeed: weatherData.list[0].wind.speed,
            windDeg:  weatherData.list[0].wind.deg,
            humidity:  weatherData.list[0].main.humidity,
            feels_like:  Math.round(weatherData.list[0].main.feels_like),
            pressure:  weatherData.list[0].main.pressure,
            visibility:  weatherData.list[0].visibility
        },
        error
    }

    return (
        <div className={style.Main}>
            <div className={'container'}>
                <div className={'wrapper'}>
                    <CurrentWeatherForecast data={currentData} />
                    <DailyWeatherForecast data={dailyData} />
                    <WeatherForecast5Days data={fiveDaysData} />
                    <SummaryInfo data={summaryData} />
                </div>
            </div>
        </div>
    )
}