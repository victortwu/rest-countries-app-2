import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import style from '../cssModules/home.module.css'

interface Props {
    regions: string[]
}

const Home: FC<Props> = ( { regions } ) => {
    
    

    
    
    return(
        <div className={style.container}>
            <h1 className={style.title}>Where in the world?</h1>
            <div className={style.cardContainer}>
                {regions.map(reg=> {
                    return <Link key={uuidv4()} to={'/countries/' + reg}>
                                <div className={style.card}>{reg}</div>
                            </Link> 
                    
                })}
            </div>
           
        </div>
    )
}

export default Home