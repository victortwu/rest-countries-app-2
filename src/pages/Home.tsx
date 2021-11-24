import React, { FC, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import style from '../cssModules/home.module.css'

interface Props {
    regions: string[]
}

const Home: FC<Props> = ( { regions } ) => {
    
    let navigate = useNavigate()

    const goToRegion = (url: string) => {
        navigate(url)
    }
    
    return(
        <div className={style.container}>
            <h1 className={style.title}>Where in the world?</h1>
            <div className={style.cardContainer}>
                {regions.map(reg=> {
                    return <div key={uuidv4()} className={style.card} onClick={()=> goToRegion('/countries/' + reg)}>
                                <span>{reg}</span>
                            </div> 
                    
                })}
            </div>
           
        </div>
    )
}

export default Home
//<Link to={'/countries/' + reg}>{reg}</Link>