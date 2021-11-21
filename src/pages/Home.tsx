import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import useFetchEverything from '../useFetchEverything'
import countriesAllUrl from '../data/countriesAllUrl'

// interface Props {
//     regions: string[]
// }

const Home: FC = (  ) => {
    
    

    const { regions } = useFetchEverything(countriesAllUrl)

    
    return(
        <div>
            <h1>Home</h1>
            {regions.map(reg=> {
                return <Link key={uuidv4()} to={'/countries/' + reg}>
                            <div>{reg}</div>
                        </Link> 
                
            })}
        </div>
    )
}

export default Home