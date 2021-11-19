



export const getData = async() => {
    try {
        
        let data
         const res = await fetch('https://restcountries.com/v3.1/all')
            .then(res => {
                return res.json()
            })
            .then(json => {
                //console.log(json)
                data = json
                
            })
            .catch(err=> {
                console.error(err.message)
            })
        
        console.log(data)
        return data
    }
    catch(err) {
        console.log(err)
    }
}

    


