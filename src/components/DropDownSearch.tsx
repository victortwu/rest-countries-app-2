import React, { FC, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import baseUrl from '../data/baseUrl'
import style from '../cssModules/dropDownSearch.module.css'

interface Props {
    countryNames: string[]
}

const DropDownSearch: FC<Props> = ( { countryNames } ) => {

    
    const [dropMenu, setDropMenu] = useState<boolean>(false)
    
    const toggleMenu:string = dropMenu ? style.menuWrapper : style.hide
    
    const toggleDropDown = (): void => {
        setDropMenu(!dropMenu)
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
            <div className={style.dropMenu}>
                {countryNames.map(name=> {
                  return <a key={uuidv4()} href={baseUrl + '/countries/:region/showpage/' + name} onClick={()=> {
                    toggleDropDown()
                   
                    }}>{name}</a>
                })}
            </div>
        </div>
        
        </>
    )
}

export default DropDownSearch

