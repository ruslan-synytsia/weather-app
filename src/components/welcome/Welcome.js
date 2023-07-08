import style from './Welcome.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useRef } from 'react'

export const Welcome = ({ setData }) => {
    const inputRef = useRef(null)
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
        inputRef.current.focus()
    }, [])

    useEffect(() => {
        const inputElement = inputRef.current
        inputElement.addEventListener('keydown', handleKeyPress)

        return () => {
            inputElement.removeEventListener('keydown', handleKeyPress)
        };
    }, [search])

    return (
        <div className={style.Welcome}>
            <h1>Welcome to Weather App</h1>
            <div className={style.Welcome_finder}>
                <input ref={inputRef} type="text" onChange={e => handleChange(e.target.value)} value={search} placeholder='enter your city' />
                <button onClick={handleClick}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </div>
        </div>
    )
}