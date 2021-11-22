import React, { FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import style from '../cssModules/countries.module.css'

interface Props {
    countries: any[]
}

const Countries: FC<Props> = ( { countries } ) => {
    
    let params = useParams()
    
    return (
        <div className={style.container}>
            <h1>Countries Page, Region: {params.region}</h1>
            <ul>
                {countries.map(country=> {
                    if (country.region === params.region) {
                        return <Link key={uuidv4()} to={`showpage/${country.name.common}`}>
                        <li>{country.name.common}</li>
                        </Link>
                    }
                   
                })}
            </ul>
        
        </div>
    )
}

export default Countries