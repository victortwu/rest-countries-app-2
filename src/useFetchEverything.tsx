import React, { useState, useEffect } from 'react'



const useFetchEverything = (url: string) => {
    
    const [data, setData] = useState<any[]>([])
    const [countryNames, setCountryNames] = useState<string[]>([])
    const [regions, setRegions] = useState<string[]>([])
    const [countryCodeObj, setCountryCodeObj] = useState<any>({})
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState<boolean>(true)

    useEffect(()=> {
        const getData = async() => {
            try {
                let countryNameArr: string[] = []
                let countryRegionSet = new Set<string>()
                let codeObj: object = {}
                
                 await fetch(url)
                    .then(res => {
                        if (!res.ok) {
                            throw Error('Could not get data from resource.')
                        }
                        return res.json()
                    })
                    .then(data => {
                       setData(data)
                       
                       data.map((country: any)=> {
                         countryNameArr.push(country.name.common)
                         countryRegionSet.add(country.region)
                       })
                       setCountryNames(countryNameArr)
                       setRegions(Array.from(countryRegionSet))
                       codeObj = data.reduce((country: any, curr: any) => ({
                         ...country, [curr.cca3]: curr.name.common
                       }), {})
                       setCountryCodeObj(codeObj)
                       setIsPending(false)
                       setError(null)
                    })
                    .catch(err=> {
                        console.error(err.message)
                        setIsPending(false)
                        setError(err.message)
                    })
                
               
            }
            catch(err: any) {
                console.error(err)
                setIsPending(false)
                setError(err)
            }
        }
        getData()
    }, [url])
    return { data, countryNames, regions, countryCodeObj, isPending, error }
}

export default useFetchEverything