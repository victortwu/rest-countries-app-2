import React, { useEffect, useState } from 'react'

const useFetch = (url: string) => {

    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=> {
        fetch(url)
        .then(res=> {
            if( !res.ok ) {
                throw Error('Could not get data from resource') 
            }
            return res.json()
        })
        .then(data=> {
            setData(data)
            setIsLoading(false)
        })
        .catch(err=> {
            console.log(err.message)
            setIsLoading(false)
            setError(err)
        })
    }, [url])
    return { data, error, isLoading }
}

export default useFetch