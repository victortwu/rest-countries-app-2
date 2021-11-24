import React, { FC, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useSpring, animated } from 'react-spring'
import baseUrl from '../data/baseUrl'
import style from '../cssModules/dropDownSearch.module.css'

interface Props {
    countryNames: string[]
}

const DropDownSearch: FC<Props> = ( { countryNames } ) => {

    
    const [dropMenu, setDropMenu] = useState<boolean>(false)
    const [hideMenu, setHideMenu] = useState<boolean>(false)
    
    const toggleMenu = hideMenu ? style.hide : style.menuWrapper
    
    const slideStyle = useSpring({
        from: { opacity: 0, translateX: -800 },
        to: { opacity: dropMenu ?  1 : 0, translateX: dropMenu ? 0 : -800 }
    })
    
    const toggleDropDown = () => {
        if ( dropMenu ) {
            setDropMenu(false)
            setTimeout(()=> {
                setHideMenu(true)
            }, 500)
        } else {
            setHideMenu(false)
            setDropMenu(true)
        }
        
    }

    

    return(
        <>
        <div onClick={()=> {
            toggleDropDown()
        }} className={style.searchBar}>
            SEARCH
        </div>

        <div onClick={()=> {
            toggleDropDown()
        }} className={toggleMenu}>
            <animated.div style={slideStyle} className={style.dropMenu}>
                {countryNames.map(name=> {
                  return <a className={style.link} key={uuidv4()} href={baseUrl + '/countries/:region/showpage/' + name} onClick={()=> {
                    toggleDropDown()
                   
                    }}>{name}</a>
                })}
            </animated.div>
        </div>
        
        </>
    )
}

export default DropDownSearch

