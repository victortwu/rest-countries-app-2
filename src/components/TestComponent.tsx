import React from 'react'
import useFetchEverything from '../useFetchEverything'

const TestComponent = () => {

    const { data, countryNames, regions, countryCodeObj, isPending, error } = useFetchEverything('https://restcountries.com/v3.1/all')

    console.log('FROM TEST: ', regions)
    return(
        <div>
            <h2>
                Testing
            </h2>
        </div>
    )
}

export default TestComponent