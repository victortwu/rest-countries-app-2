import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'


interface Props {
    regions: string[]
}

const Home: FC<Props> = ( { regions } ) => {
    
    

    
    
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