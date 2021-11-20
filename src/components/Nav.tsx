import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import style from '../cssModules/nav.module.css'

interface Props {
    regions: string[]
}

const Nav: FC<Props> = ( { regions } ) => {
    
    const [dropMenu, setDropMenu] = useState<boolean>(false)
    
    const showClass: string = dropMenu ? style.mainNav : style.hide

    const toggleMainMenu = ():void => {
        setDropMenu(!dropMenu)
    }
    
    return(
        <nav className={style.container}>
            <div className={style.countrySearch}>placeholder</div>
            <div onClick={()=> toggleMainMenu()} className={style.hamburger}>
                <div className={style.hamLine}/>
                <div className={style.hamLine}/>
                <div className={style.hamLine}/>
            </div>
            <div className={showClass}>
                <Link to='/'>Home</Link>
                {regions.map(reg=> {
                    return <Link to={'/countries/' + reg}>{reg}</Link>
                })}
            
            </div>
        </nav>
    )
}

export default Nav