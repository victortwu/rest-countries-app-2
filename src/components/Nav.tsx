import React, { FC, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import DropDownSearch from './DropDownSearch'
import style from '../cssModules/nav.module.css'

interface Props {
    regions: string[]
    countryNames: string[]
}

const Nav: FC<Props> = ( { countryNames, regions } ) => {
    
    const [dropMenu, setDropMenu] = useState<boolean>(false)

    const hamMenuRef = useRef<HTMLDivElement>(null)
    
    const showClass: string = dropMenu ? style.mainMenuWrap : style.hide

    
    
    const toggleMainMenu = ():void => {
       
        if (  dropMenu ) {
            console.log('SLIDE IT BACK')
           
            setTimeout(()=> {
                setDropMenu(false)
            }, 0)
        } else {
            setDropMenu(true)
   
            
        }
    }
 
    return(
        <>
        
        <nav className={style.container}>
            <DropDownSearch countryNames={countryNames}/>
            
            <div onClick={()=> toggleMainMenu()} className={style.hamburger}>
                <div className={style.hamLine}/>
                <div className={style.hamLine}/>
                <div className={style.hamLine}/>
            </div>
        </nav>

        <div onClick={()=> {
            toggleMainMenu()
        }} className={showClass}>
              <div ref={hamMenuRef} onClick={(e)=> e.stopPropagation()} className={`${style.hamMenu}`}>
                    <Link to='/' onClick={()=> {
                        toggleMainMenu()
                    }}>Home</Link>
                    {regions.map(reg=> {
                        return <Link key={uuidv4()} onClick={()=> {
                            toggleMainMenu()
                        }} to={'/countries/' + reg}>{reg}</Link>
                    })}
                </div>
        </div>
        
        </>
    )
}

export default Nav

