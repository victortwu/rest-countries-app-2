import React, { FC, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import style from '../cssModules/home.module.css'
import { AnyFn } from '@react-spring/types'

interface Props {
    regions: string[]
    isPending: boolean
    changeTitle: AnyFn
}

const Home:FC<Props> = (  { regions, isPending, changeTitle } ) => {

    let navigate = useNavigate()

    const goToRegion = (url: string) => {
        navigate(url)
    }

    if ( isPending ) {
        return <div>loading...</div>
    }
    
    return(
        <div className={style.container}>
            <div className={style.bgImgDiv}/>
            <h1 className={style.title}>Where in the <span className={style.world}>world</span><span className={style.qMark}>?</span></h1>
            <div className={style.cardContainer}>
                {regions.map(reg=> {
                    return <div key={uuidv4()} className={style.card} onClick={()=> {
                        goToRegion('/countries/' + reg)
                        changeTitle(reg)
                        }}>
                                <span>{reg}</span>
                            </div> 
                    
                })}
            </div>
           
        </div>
    )
}

export default Home
