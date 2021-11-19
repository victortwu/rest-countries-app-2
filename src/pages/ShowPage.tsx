import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

interface Props {
    countries: any[]
    countryCodeObj: any
    
}

const ShowPage: FC<Props> = ( { countries, countryCodeObj } ) => {

    let params = useParams()
   
    return(
        <div>
            <h1>Show Page</h1>
            <div>{countries.map(nation=> {
                if ( nation.name.common === params.country ) {
                 
                    return <>
                                <h3>{nation.name.common}, Capital: {nation.capital?.map((cap:string)=> {return cap})}</h3>
                                <div>
                                    { 
                                        nation.borders?.map((code: string, i: number)=> {
                                            return <button key={code + i}>{countryCodeObj[code]}</button>
                                        })
                                    }
                                </div>
                            </>
                }
            })}</div>

        </div>
    )
}

export default ShowPage