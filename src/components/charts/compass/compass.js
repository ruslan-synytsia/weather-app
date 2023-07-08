import style from './compass.module.css'

export const Compass = (props) => {
  return (
    <div className={style.Compass}>
        <div className={style.Compass_vertical} >
            <span>N</span>
            <span>S</span>
        </div>
        <div className={style.Compass_horizontal} >
            <span>W</span>
            <span>E</span>
        </div>
        <div style={ {transform: `rotate(${props.deg}deg)`} } className={style.Compass_arrow}>
        </div>
    </div>
  )
}
