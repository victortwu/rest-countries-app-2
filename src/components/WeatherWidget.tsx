import React, { FC } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ReactComponent as MapIcon } from '../assets/mapIcon.svg' 
import style from '../cssModules/showPage.module.css'

interface Props {
    capital: string
    clock: string
    weatherObj: any
    loading: boolean
}

const WeatherWidget: FC<Props> = ( { capital, clock, weatherObj, loading } ) => {
    
    return (
        <div className={style.weatherWidget}>
            <div className={style.localTime}>
                <span className={style.timeLabel}>Local time: </span>
                <span className={style.clock}>{clock}</span>
            </div>
            
            <div className={style.capDiv}>
                <span>{capital?.toUpperCase()}</span>
                <div className={style.iconCnt}><MapIcon/></div>
            </div>
            
            {loading ? 'loading...':<div className={style.tempDiv}>    
                        <span className={style.mainTempSpan}>{weatherObj.main?.temp} °F</span>
                    
                    

                    <span className={style.feelsLikeSpan}>Feels like {weatherObj.main?.feels_like}°F</span>

                    <div className={style.conditions}>
                        {weatherObj.weather?.map((w:any)=> { return <span key={uuidv4()}>{w.description}</span>})}
                    </div>
            </div>}
        </div>
    )
}

export default WeatherWidget