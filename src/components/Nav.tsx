import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { ReactComponent as GlobeIcon } from '../assets/globeIcon.svg'
import style from '../cssModules/nav.module.css'
import { useSpring, animated } from 'react-spring'
import { AnyFn } from '@react-spring/types'
import SearchBar from './SearchBar'

interface Props {
    regions: string[]
    countryNames: string[]
    changeTitle: AnyFn
    title: string
}

const Nav: FC<Props> = ( { countryNames, regions, changeTitle, title } ) => {

    let navigate = useNavigate()

    const goToPage = (url: string) => {
        navigate(url)
    }
    
    

    //const [slidInTitle, setSlidInTitle] = useState<boolean>(false)
    
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
       config: { duration: 100 }
   })

//    const slideTitleStyle = useSpring({
//        from: { opacity: 0, translateX: 800 },
//        to: { opacity: slidInTitle ? 1 : 0, translateX: slidInTitle ? 0 : 800 }

//    })


    
    
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

    // useEffect(()=> {
    //     setSlidInTitle(true)
    //     return setSlidInTitle(false)
    // }, [title])
 
    return(
        <>
        
        <nav className={style.container}>
            {title ? <div className={style.title} onClick={()=> {
                goToPage('/')
                changeTitle('')
                }}><h2>{title}</h2></div> : <div className={style.iconDiv}><GlobeIcon/></div>}
            
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
                    <div style={{color: 'var(--hotPink)'}} className={style.hamMenuLink} onClick={()=> {
                        goToPage('/')
                        toggleMainMenu()
                        changeTitle('')
                    }}>Home</div>
                    {regions.map(reg=> {
                        return <div className={style.hamMenuLink} key={uuidv4()} onClick={()=> {
                            goToPage('/countries/' + reg)
                            toggleMainMenu()
                            changeTitle(reg)
                            
                        }}>{reg}</div>
                    })}
                    <SearchBar countryNames={countryNames} />
                </animated.div>
        </div>
        
        </>
    )
}

export default Nav

