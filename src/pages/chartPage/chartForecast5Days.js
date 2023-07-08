import style from './chartForecast5Days.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TemperatureChart5days } from '../../components/charts/temperatureChart5Days/temperatureChart5days'

export const ChartForecast5Days = () => {
    const data = useSelector(state => state.weatherData.data.list)
    return (
        <div className={style.Chart}>
            <div className={'container'}>
                <div className={'wrapper'}>
                    <div className={style.Chart_button}>
                        <Link to={'/'}><button><FontAwesomeIcon icon={faArrowLeft} /></button></Link>
                    </div>
                    <div className={style.Chart_content}>
                        <TemperatureChart5days data={data} />
                    </div>
                </div>
            </div>
        </div>
    )
}