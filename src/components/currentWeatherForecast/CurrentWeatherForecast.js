import { useEffect, useState, useRef } from 'react'
import style from './CurrentWeatherForecast.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export const CurrentWeatherForecast = (props) => {
    const { 
        setData,
        cityName, 
        description, 
        temp, 
        error } = props.data

    const inputRef = useRef()

    const [search, setSearch] = useState('')

    const handleChange = (val) => {
        setSearch(val)
    }

    const handleClick = () => {
        if (search !== '') {
            setData(search)
            setSearch('')
            inputRef.current.blur()
        }
    }

    const handleKeyPress = (event) => {
        if (event.keyCode === 13) {
            handleClick()
        }
    }

    useEffect(() => {
        const inputElement = inputRef.current
        inputElement.addEventListener('keydown', handleKeyPress)

        return () => {
            inputElement.removeEventListener('keydown', handleKeyPress)
        };
    }, [search])

    return (
        <div className={style.Current}>
            <div className={style.Current_finder}>
                <input 
                    type="find" 
                    placeholder="enter your location" 
                    onChange={e => handleChange(e.target.value)}
                    value={search}
                    ref={inputRef}
                />
                <button onClick={handleClick}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </div>
            <div className={style.Current_common_data}>
                <span>{cityName}</span>
                <span>{description}</span>
            </div>
            <div className={style.Current_temperature}>
                {temp}&deg;C
            </div>
        </div>
    )
}