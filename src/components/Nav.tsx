import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import style from '../cssModules/nav.module.css'

interface Props {
    regions: string[]
}

const Nav: FC<Props> = ( { regions } ) => {
    
    const [dropMenu, setDropMenu] = useState<boolean>(false)
    
    const showClass: string = dropMenu ? style.mainMenuWrap : style.hide

    const toggleMainMenu = ():void => {
        setDropMenu(!dropMenu)
    }
    
    return(
        <>
        
        <nav className={style.container}>
            <div className={style.countrySearch}>placeholder</div>
            
            <div onClick={()=> toggleMainMenu()} className={style.hamburger}>
                <div className={style.hamLine}/>
                <div className={style.hamLine}/>
                <div className={style.hamLine}/>
            </div>
        </nav>

        <div onClick={()=> {
            toggleMainMenu()
        }} className={showClass}>
                <div onClick={(e)=> e.stopPropagation()} className={style.hamMenu}>
                    <Link to='/' onClick={()=> {
                        toggleMainMenu()
                    }}>Home</Link>
                    {regions.map(reg=> {
                        return <Link onClick={()=> {
                            toggleMainMenu()
                        }} to={'/countries/' + reg}>{reg}</Link>
                    })}
                </div>
        </div>
        
        </>
    )
}

export default Nav