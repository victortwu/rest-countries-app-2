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

            {countries.map(nation=> {
                if ( nation.name.common === countryParam ) {

                    return <div className={style.contentDiv} key={uuidv4()}>

                                <div className={style.containerLeft}>
                                    <button onClick={()=> navigate(-1)}>BACK</button>
                                    <h1>{nation.name.common}</h1>
                                    <div className={style.imgContainer}>
                                        <img src={nation.flags.svg} alt='flag'/>
                                    </div>
                                    <h4>Capital: {nation.capital?.map((cap:string)=> {return <span key={uuidv4()}>{cap}</span>})}</h4>
                                    <p>Population: {nation.population.toLocaleString('en-US')}</p>

                                </div>

                                <div className={style.containerRight}>
                                    <div className={style.bordersDiv}>
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
