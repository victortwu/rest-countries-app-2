import React, { FC, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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

    useEffect(()=> {
        setCountryParam(countryParam)
    }, [countryParam])
  
    return(
        <div className={style.container}>
            <h1>Show Page</h1>
            <div>{countries.map(nation=> {
                if ( nation.name.common === countryParam ) {
                 
                    return <div key={uuidv4()}>
                                <h3>{nation.name.common}, Capital: {nation.capital?.map((cap:string)=> {return <span key={uuidv4()}>{cap}</span>})}</h3>
                                <div>
                                    { 
                                        nation.borders?.map((code: string, i: number)=> {
                                            return <button onClick={()=> setCountryParam(countryCodeObj[code])} key={uuidv4()}>{countryCodeObj[code]}</button>
                                        })
                                    }
                                </div>
                            </div>
                }
            })}</div>
        <button onClick={()=> navigate(-1)}>BACK</button>
        </div>
    )
}

export default ShowPage
