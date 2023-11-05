import { useEffect, useRef } from 'react'
import style from './DailyWeatherForecast.module.css'
import { setupSwipeScroll } from '../../components/functions/horizontalSwipe/horizontalSwipe'

export const DailyWeatherForecast = (props) => {
    const swipedElement = useRef(null);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const { date, tempMin, tempMax, list } = props.data

    useEffect(() => {
        const listContainer = swipedElement.current;
        if (listContainer) {
            setupSwipeScroll(listContainer);
        }
    }, [])
    
    return (
        <>
            <div className={style.Daily_date}>
                <span>{`${daysOfWeek[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`}</span>
            </div>
            <div className={style.Daily_today_forecast}>
                <h2>Today</h2>
                <div className={style.Daily_temperatures}>
                    {
                        tempMin === tempMax ? 
                        <span>{tempMin}&deg;C</span> :
                        <span>{tempMin}&deg;...&nbsp;&nbsp;{tempMax}&deg;C</span>
                    }
                </div>
            </div>
            <div className={style.Daily_by_hours}>
                <ul ref={swipedElement}>
                    {
                        list.slice(0, 8).map((li, index) => {
                            return (
                                <li key={li.dt}>
                                    <span className={style.Daily_time}>{index === 0 ? 'Now' : li.dt_txt.slice(11, li.dt_txt.length - 3)}</span>
                                    <span className={style.Daily_icon}><img src={`https://openweathermap.org/img/wn/${li.weather[0].icon}.png`} alt="icon" /></span>
                                    <span className={style.Daily_temp}>{Math.floor(li.main.temp)}&deg;</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}