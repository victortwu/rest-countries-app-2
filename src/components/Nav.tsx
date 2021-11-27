import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import DropDownSearch from './DropDownSearch'
import style from '../cssModules/nav.module.css'
import { useSpring, animated } from 'react-spring'

interface Props {
    regions: string[]
    countryNames: string[]
}

const Nav: FC<Props> = ( { countryNames, regions } ) => {
    
    const [dropMenu, setDropMenu] = useState<boolean>(false)

    const [hideMenu, setHideMenu] = useState<boolean>(true)
    
    const showClass: string = hideMenu ? style.hide : style.mainMenuWrap

    const slideMenuStyle = useSpring({
        from: { opacity: 0, translateX: 500  },
        to: { opacity: dropMenu ? 1 : 0, translateX: dropMenu ? 0 : 500 },
        config: { duration: 200 }
    })

   const spinBurger = useSpring({
       from: { opacity: 1, rotate: 0 },
       to: { opacity: dropMenu ? .7 : 1, rotate: dropMenu ? 90 : 0 },
       config: { duration: 200 }
   })
    
    
    const toggleMainMenu = ():void => {
       
        if ( dropMenu ) {
           setDropMenu(false)
           
           setTimeout(()=> {
                setHideMenu(true)
           }, 300)
        
        } else {
            setHideMenu(false)
            setDropMenu(true)
        }
    }
 
    return(
        <>
        
        <nav className={style.container}>
            <DropDownSearch countryNames={countryNames}/>
            
            <animated.div style={spinBurger} onClick={()=> toggleMainMenu()} className={style.hamburger}>
                <div className={style.hamLine}/>
                <div className={style.hamLine}/>
                <div className={style.hamLine}/>
            </animated.div>
        </nav>

        <div onClick={()=> {
            toggleMainMenu()
        }} className={showClass}>
              <animated.div style={slideMenuStyle} onClick={(e)=> e.stopPropagation()} className={style.hamMenu}>
                    <Link to='/' onClick={()=> {
                        toggleMainMenu()
                    }}>Home</Link>
                    {regions.map(reg=> {
                        return <Link key={uuidv4()} onClick={()=> {
                            toggleMainMenu()
                        }} to={'/countries/' + reg}>{reg}</Link>
                    })}
                </animated.div>
        </div>
        
        </>
    )
}

export default Nav

