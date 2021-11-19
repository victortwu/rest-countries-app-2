import React, { FC } from 'react'
import { Link } from 'react-router-dom'

interface Props {
    regions: string[]
}

const Home: FC<Props> = ( { regions } ) => {
    return(
        <div>
            <h1>Home</h1>
            {regions.map(reg=> {
                return <Link to={'/countries/' + reg}>
                            <div key={reg}>{reg}</div>
                        </Link> 
                
            })}
        </div>
    )
}

export default Home