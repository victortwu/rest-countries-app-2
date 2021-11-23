import React from 'react'
import useFetchEverything from '../useFetchEverything'
import { useSpring, animated } from 'react-spring'
import { config } from 'process'

const TestComponent = () => {

    const [toggled, setToggled] = React.useState<boolean>(false)

    const fading = useSpring({
        
        from: { opacity: 0 },
        to: { opacity: toggled ? 1 : 0 }
    })

    const { data, countryNames, regions, countryCodeObj, isPending, error } = useFetchEverything('https://restcountries.com/v3.1/all')

    console.log('FROM TEST: ', regions)
    return(
        <div>
            <button onClick={()=> setToggled(!toggled)}>toggle</button>
            <animated.div style={fading}>
                <div style={testDiv}/>
            </animated.div>
            
        </div>
    )
}

const testDiv = {
    width: '200px',
    height: '200px',
    padding: '.5rem',
    backgroundColor: 'gray'
}

export default TestComponent