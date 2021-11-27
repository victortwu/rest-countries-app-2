import React, { FC } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import style from '../cssModules/countries.module.css'

interface Props {
    countries: any[]
}

const Countries: FC<Props> = ( { countries } ) => {

    let params = useParams()
    let navigate = useNavigate()

    const goToPage = (url: string) => {
      navigate(url)
    }


    return (
        <div className={style.container}>
            <h1>Countries Page, Region: {params.region}</h1>
            <div className={style.scrollContainer}>
                <div className={style.scroller}>
                    {countries.map(country=> {
                        if (country.region === params.region) {
                            return <div className={style.card} key={uuidv4()} onClick={()=> goToPage(`showpage/${country.name.common}`)}>
                                        <div className={style.imgContainer}><img src={country.flags.svg} alt='flag'/></div>
                                        {country.name.common}
                                        <div className={style.contentContainer}>
                                            <div className={style.content}>
                                                <p>Capital: {country.capital?.map((cap: string)=> {return <span key={uuidv4()}>{cap}</span>})}</p>
                                                <p>Population: {country.population.toLocaleString('en-US')}</p>
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
