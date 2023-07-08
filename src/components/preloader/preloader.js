import style from './preloader.module.css'

export const Preloader = () => {
  return (
    <div className={style.Preloader}>
        <div className={style.loading}>
            <div className={style.ldio}>
                <div></div>
            </div>
        </div>
    </div>
  )
}