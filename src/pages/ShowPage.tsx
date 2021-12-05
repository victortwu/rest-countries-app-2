import React, { FC, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { createLanguageServiceSourceFile } from 'typescript'
import { v4 as uuidv4 } from 'uuid'
import { ReactComponent as MapIcon } from '../assets/mapIcon.svg'
import style from '../cssModules/showPage.module.css'


interface Props {
    countries: any[]
    countryCodeObj: any
}

const ShowPage: FC<Props> = ( { countries, countryCodeObj } ) => {

    let params = useParams()
    let navigate = useNavigate()

    const [countryParam, setCountryParam] = useState<string | undefined>(params.country)
    const [capital, setCapital] = useState('')
    const [clock, setClock] = useState('')
    const [weatherObj, setWeatherObj] = useState<any>({})
    const [loading, setLoading] = useState(true)

    const baseUrl = 'http://localhost:5000'
   
   // weatherMap calls openweathermap.org

    const getWeather = () => {
        
        let coordArr: number[] = []
        let lat: string = ''
        let long: string = ''
        
        countries.map(nation=> {
            if ( nation.name.common === countryParam ) {
              
                if (!nation.capitolInfo) {
                    
                    coordArr = nation.latlng
                    lat = `${coordArr[0]}`
                    long = `${coordArr[1]}`
                } else {
                 
                    coordArr = nation.capitalInfo?.latlng
                    lat = `${coordArr[0]}`
                    long = `${coordArr[1]}`
                }
              
           
                fetch(`${baseUrl}/weatherMap/${lat}/${long}`)
                .then(res=> {
                    return res
                })
                .then(data=> {
                    return data.json()
                })
                .then(json=> {
                    setWeatherObj(json)
                    setLoading(false)
                })
                .catch(err=> {
                    console.error(err.message)
                    setLoading(false)
                })
            }
        })
    }

   const getCapital = () => {
       countries.map(nation=> {
           if ( nation.name.common === countryParam ) {
               setCapital(nation.capital?.[0])
           }
       })
   }
    
    const getLanguages = (lang: any) => {
        let langArr: string[] = []
        for ( const key in lang ) {
            langArr.push(lang[key])
        }
        return langArr.map((language, i) => {
            return <span key={uuidv4()}>{language}{(i !== langArr.length - 1) ? ', ' : ''}</span>
        })
    }

    const getIntTime = () => {
        let timezone: string = ''
        countries.map(nation=> {
            if ( nation.name.common === countryParam ) {
                nation.timezones.map((tz: string, i: number)=> { 
                    if ( i === 0 ) {
                        timezone =  tz
                    }
                 })
            }
        })
      
        let strArr = timezone.split('')
        let tempArr = strArr.map(l=> {
            let char
            if ( l !== 'U' && l !== 'C' && l !== 'T' && l !== '+' ) {
               if ( l === ':') {
                   char = '.'
               }
               else {
                   char = l
               }
            }
            return char     
         })
        let result = tempArr.join('')
        const numStrArr = tempArr.join('').split('.')
       
        if ( numStrArr[1] === '30') {
            result = numStrArr[0] + '.50'
        }
        
        const localDate = new Date()
        const msTime = localDate.getTime()
       
        const localUtcOffset = localDate.getTimezoneOffset() * 60000 //get in ms
        // current utc time
        const utc = msTime + localUtcOffset
        const localTimeMs = utc + (3600000 * Number(result))
        const intDate = new Date(localTimeMs)

        let hour: number | string = intDate.getHours()
        let minute: number | string = intDate.getMinutes()
        //let second: number | string = intDate.getSeconds()
        let amPm: string = 'AM'

        if ( hour === 0 ) {
            hour = 12
        }

        if ( hour > 12 ) {
            hour = hour - 12
            amPm = 'PM'
        }

        hour = ( hour < 10 ) ? '0' + hour : hour
        minute = ( minute < 10 ) ? '0' + minute : minute
        //second = ( second < 10 ) ? '0' + second : second
        setClock(`${hour}:${minute} ${amPm}`)
        setTimeout(getIntTime, 60000)
        
    }
    
    
    const getCurrencies = (curr: any) => {
        let currArr: string[] = []
        for ( const key in curr ) {
            currArr.push(curr[key].name)
        }
        return currArr.map((currency, i)=> {
            return <span key={uuidv4()}>{currency}{(i !== currArr.length - 1) ? ', ' : ''}</span>
        })
    }

   
    useEffect(()=> {
        setCountryParam(countryParam)
        getWeather()
        getIntTime()
        getCapital()
    }, [countryParam])
   
  
    return(
        <div className={style.container}>

            {countries.map(nation=> {
                if ( nation.name.common === countryParam ) {
                    
                    return <div className={style.contentDiv} key={uuidv4()}>

                                <div className={style.containerLeft}>
                                    <button className={style.theseBtns} onClick={()=> navigate(-1)}>BACK</button>
                                    <h1 className={style.name}>{nation.name.common}</h1>
                                    <p>Population: {nation.population.toLocaleString('en-US')}</p>
                                    <div className={style.imgContainer}>
                                        <img src={nation.flags.svg} alt='flag'/>
                                    </div>
                                    
                                    <div className={style.subTitleDiv}>
                                        <div className={style.officialLabel}>Official name:</div> 
                                        <div className={style.officialName}>{nation.name.official}</div>
                                        
                                        {!capital ? '' :<div className={style.capital}>
                                            Capital: <span className={style.capitalSpan}>{capital}</span>
                                        </div>}
                                    </div>
                                </div>

                                <div className={style.containerRight}>
                                    <div className={style.weatherWidget}>
                                        <div className={style.localTime}>
                                            <span className={style.timeLabel}>Local time: </span>
                                            <span className={style.clock}>{clock}</span>
                                        </div>
                                        
                                        <div className={style.capDiv}>
                                            <span>{capital.toUpperCase()}</span>
                                            <div className={style.iconCnt}><MapIcon/></div>
                                        </div>
                                        
                                        {loading ? 'loading...':<div className={style.tempDiv}>    
                                                 <span className={style.mainTempSpan}>{weatherObj.main?.temp} °F</span>
                                                
                                                

                                                <span className={style.feelsLikeSpan}>Feels like {weatherObj.main?.feels_like}°F</span>

                                                <div className={style.conditions}>
                                            {weatherObj.weather?.map((w:any)=> { return <span>{w.description}</span>})}
                                        </div>
                                        </div>}
                                        
                                    </div>

                                    <table className={style.infoTable}>
                                        <tbody>
                                            <tr>
                                                <td className={style.rowLabel}>Region:</td>
                                                <td className={style.rowContent}>{nation.region}</td>
                                            </tr>
                                            <tr>
                                                <td className={style.rowLabel}>Subregion:</td>
                                                <td className={style.rowContent}>{nation.subregion}</td>
                                            </tr>
                                            <tr>
                                                <td className={style.rowLabel}>Languages:</td>
                                                <td className={style.rowContent}>{getLanguages(nation.languages)}</td>
                                            </tr>
                                            <tr>
                                                <td className={style.rowLabel}>Currencies:</td>
                                                <td className={style.rowContent}>{getCurrencies(nation.currencies)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                  
                                    
                                    <div className={style.bordersDiv}>
                                        <p>Borders:</p>
                                        
                                        {
                                            nation.borders?.map((code: string, i: number)=> {
                                                return <button className={style.theseBtns} onClick={()=> setCountryParam(countryCodeObj[code])} key={uuidv4()}>{countryCodeObj[code]}</button>
                                            })
                                        }
                                       
                                    </div>
                                </div>
                            </div>

                }
            })}

        </div>
    )
}

export default ShowPage
