import style from './WeatherForecast5Days.module.css'
import { Link } from 'react-router-dom'

export const WeatherForecast5Days = (props) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const { list, error } = props.data
    
    return (
        <div className={style.Five_days}>
            <ul>
                {
                    list.map((li, index) => {
                        if (index <= 2) {
                            return (
                                <li key={li.date}>
                                    <h2>{`${daysOfWeek[new Date(li.date * 1000).getDay()]}`}</h2>
                                    <span><img src={`https://openweathermap.org/img/wn/${li.icon}.png`} alt="icon" /></span>
                                    <div className={style.Five_days_temperatures}>
                                        <span className={style.Five_days_temp}>{li.maxTemp}&deg;</span>
                                    </div>
                                </li>
                            )
                        }
                    })
                }
            </ul>
            <Link to='/chart'>
                <button className={style.Five_days_btn}>Forecast on 5 days</button>
            </Link>
        </div>
    )
}