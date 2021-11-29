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
    const [latLong, setLatLong] = useState([])

    const baseUrl = 'http://dataservice.accuweather.com'
    const apiKey = process.env.REACT_APP_WEATHERAPIKEY

    const getWeatherInfo = (key: string) => {
        fetch(`${baseUrl}/currentconditions/v1/${key}?apikey=${apiKey}`)
        .then(res=> {
            if(!res.ok) {
                throw Error('Cannot get the weather')
            }
            return res.json()
        })
        .then(data=> {
            console.log(data)
        })
        .catch(err=> {
            console.error(err.message)
        })
    }
    
    const getKeyByGeo = (longLat: any[] ) => {
        console.log(longLat[0])
        console.log(longLat[1])
        fetch(`${baseUrl}/locations/v1/cities/geoposition/search?apikey=${apiKey}=${longLat[0]},${longLat[1]}`)
        .then(res=> {
            console.log(res)
            if(!res.ok) {
                throw Error('Cannot get location')
            }
            return res.json()
        })
        .then(data=> {
            console.log(data)
            //getWeatherInfo(data.key)
        })
        .catch(err=> {
            console.error(err.message)
        })
    }

    const getLatLong = () => {
        countries.map(nation=> {
            if ( nation.name.common === countryParam ) {
                console.log(nation.capitalInfo.latlng)
                getKeyByGeo(nation.capitalInfo.latlng)
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

    const getCurrencies = (curr: any) => {
        let currArr: string[] = []
        for ( const key in curr ) {
            currArr.push(curr[key].name)
        }
        return currArr.map((currency, i)=> {
            return <span key={uuidv4()}>{currency}{(i !== currArr.length - 1) ? ', ' : ''}</span>
        })
    }

    interface Location {
        loc: any[]
    }
    
    useEffect(()=> {
        setCountryParam(countryParam)
        getLatLong()
       
    }, [countryParam])
   
   console.log(baseUrl)
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
