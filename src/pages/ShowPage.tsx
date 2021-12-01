import React, { FC, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { createLanguageServiceSourceFile } from 'typescript'
import { v4 as uuidv4 } from 'uuid'
import style from '../cssModules/showPage.module.css'


interface Props {
    countries: any[]
    countryCodeObj: any
}

const ShowPage: FC<Props> = ( { countries, countryCodeObj } ) => {

    let params = useParams()
    let navigate = useNavigate()

    const [countryParam, setCountryParam] = useState<string | undefined>(params.country)
    const [clock, setClock] = useState('')

    const baseUrl = 'http://localhost:5000'
   
    // accuweather fetch call to own backend, only 50 free calls a day
    
    const getWeather = () => {
        countries.map(nation=> {
            if ( nation.name.common === countryParam ) {
                const coordArr: number[] = nation.capitalInfo.latlng
                const coordStr: string = `${coordArr[0]},${coordArr[1]}`
                fetch(`${baseUrl}/weather/${coordStr}`)
                .then(res=> {
                    return res
                })
                .then(data=> {
                    return data.json()
                })
                .then(json=> {
                    console.log(json)
                })
                .catch(err=> {
                    console.error(err.message)
                })
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
        //getWeather()
        getIntTime()
    }, [countryParam])
   
  
    return(
        <div className={style.container}>

            {countries.map(nation=> {
                if ( nation.name.common === countryParam ) {
                    
                    return <div className={style.contentDiv} key={uuidv4()}>

                                <div className={style.containerLeft}>
                                    <button onClick={()=> navigate(-1)}>BACK</button>
                                    <h1>{nation.name.common}</h1>
                                    <div className={style.imgContainer}>
                                        <img src={nation.flags.svg} alt='flag'/>
                                    </div>
                                    <p>Official name:</p> 
                                    <h2>{nation.name.official}</h2>
                                    <h2>Local time: {clock}</h2>
                                </div>

                                <div className={style.containerRight}>
                                    <h4>Capital: {nation.capital?.map((cap:string)=> {return <span key={uuidv4()}>{cap}</span>})}</h4>
                                    <p>Population: {nation.population.toLocaleString('en-US')}</p>
                                    <p>Region: {nation.region}</p>
                                    <p>Subregion: {nation.subregion}</p>
                                    <p>Languages: {getLanguages(nation.languages)}</p>
                                    <p>Currencies: {getCurrencies(nation.currencies)}</p>
                                    <div className={style.bordersDiv}>
                                        <p>Borders:</p>
                                        {
                                            nation.borders?.map((code: string, i: number)=> {
                                                return <button onClick={()=> setCountryParam(countryCodeObj[code])} key={uuidv4()}>{countryCodeObj[code]}</button>
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
