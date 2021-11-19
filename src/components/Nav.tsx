import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import style from '../cssModules/nav.module.css'

const Nav: FC = () => {
    return(
        <nav className={style.container}>
            Nav
            <Link to='/'>Home</Link>
            <Link to='/countries'>Countries</Link>
            

        </nav>
    )
}

export default Nav