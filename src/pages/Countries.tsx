import React, { FC } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import style from '../cssModules/countries.module.css'

interface Props {
    countries: any[]
    isPending: boolean
}

const Countries: FC<Props> = ( { countries, isPending } ) => {

    let params = useParams()
    let navigate = useNavigate()

    const goToPage = (url: string) => {
      navigate(url)
    }

    if ( isPending ) {
        return <div>loading...</div>
    }

    return (
        <div className={style.container}>
            <h2 className={style.title}>{params.region}</h2>
            <div className={style.scrollContainer}>
                <div className={style.scroller}>
                    {countries.map(country=> {
                        if (country.region === params.region) {
                            return <div className={style.card} key={uuidv4()} onClick={()=> goToPage(`showpage/${country.name.common}`)}>
                                        <div className={style.imgContainer}><img src={country.flags.svg} alt='flag'/></div>
                                        <span className={style.name}>{country.name.common}</span>
                                        <div className={style.contentContainer}>
                                            <div className={style.content}>
                                                <p><span className={style.contentHeading}>Capital: </span>{country.capital?.map((cap: string)=> {return <span className={style.info} key={uuidv4()}>{cap}</span>})}</p>
                                                <p><span className={style.contentHeading}>Population: </span><span className={style.info}>{country.population.toLocaleString('en-US')}</span></p>
                                            </div>    
                                        </div>    
                                    </div>
                        }

                    })}
                </div>
            </div>
        </div>
    )
}

export default Countries
