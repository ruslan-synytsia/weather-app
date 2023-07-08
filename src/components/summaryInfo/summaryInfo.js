import style from './summaryInfo.module.css'
import { Compass } from '../charts/compass/compass'
import { SunriseSunsetChart } from '../../components/charts/sunriseSunsetChart/sunriseSunsetChart'

export const SummaryInfo = (props) => {
    const {
        sunrise,
        sunset,
        windSpeed,
        windDeg,
        humidity,
        feels_like,
        pressure,
        visibility
    } = props.data.summary

    const sunriseLocale = new Date(sunrise * 1000).toLocaleTimeString()
    const sunsetLocale = new Date(sunset * 1000).toLocaleTimeString()

    const defineDirection = deg => {
        if (deg === 0) return 'North'
        if (deg === 90) return 'East'
        if (deg === 180) return 'South'
        if (deg === 270) return 'West'
        if (deg > 0 && deg < 90) return 'North-East'
        if (deg > 90 && deg < 180) return 'South-East'
        if (deg > 180 && deg < 270) return 'South-West'
        if (deg > 270 && deg < 359) return 'North-West'
        return null
    }

    return (
        <div className={style.SummaryInfo}>
            <div className={style.SummaryInfo_wind}>
                <div className={style.SummaryInfo_wind_total}>
                <span>{defineDirection(windDeg)}</span>
                <span>{windSpeed} km/h</span>
                </div>
                <Compass deg={windDeg} />
            </div>
            <div className={style.SummaryInfo_sunrise_sunset}>
                <div className={style.SummaryInfo_sunrise_sunset_item}>
                    <span>Sunrise</span>
                    <span>{sunriseLocale.slice(0, 5)}</span>
                </div>
                <div className={style.SummaryInfo_sunrise_sunset_item}>
                    <SunriseSunsetChart />
                </div>
                <div className={style.SummaryInfo_sunrise_sunset_item}>
                    <span>Sunset</span>
                    <span>{sunsetLocale.slice(0, 5)}</span>
                </div>
            </div>
            <div className={style.SummaryInfo_common}>
                <div className={style.SummaryInfo_common_item}>
                    <span>Humidity</span>
                    <span>{humidity}%</span>
                </div>
                <div className={style.SummaryInfo_common_item}>
                    <span>Feels like</span>
                    <span>{feels_like}&deg;</span>
                </div>
                <div className={style.SummaryInfo_common_item}>
                    <span>Pressure</span>
                    <span>{pressure}mbar</span>
                </div>
                <div className={style.SummaryInfo_common_item}>
                    <span>Visibility</span>
                    <span>{visibility / 1000}km</span>
                </div>
            </div>
        </div>
    )
}