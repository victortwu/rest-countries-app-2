import React, { FC } from 'react'
import { Link } from 'react-router-dom'

interface Props {
    countries: any[]
}

const Countries: FC<Props> = ( { countries } ) => {
    const hello = 'world'
    return (
        <div>
            <h1>Countries Page</h1>
            <ul>
                {countries.map(country=> {
                    return <Link to={`showpage/${country.name.common}`}>
                            <li key={country.name.common}>{country.name.common}</li>
                            </Link>
                })}
            </ul>
        
        </div>
    )
}

export default Countries