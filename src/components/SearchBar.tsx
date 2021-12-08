import React, { FC, useState, useRef } from 'react'

interface Props {
    countryNames: string[]
}

const SearchBar: FC<Props> = ( { countryNames } ) => {
    
    const [searchInput, setSearchInput] = useState('')

    const inputRef = useRef<HTMLInputElement>(null)

    inputRef.current?.focus()
    
    const searchCountries = (inputStr:string) => {
        countryNames.map(name=> {
         if ( name.toLowerCase().includes(inputStr.toLowerCase()) ) {
                setSearchInput(name)
            }
       })
    }
    
    
    const handleChange =(e: React.ChangeEvent<HTMLInputElement>)=> {
        e.preventDefault()
        searchCountries(e.target.value)
        setTimeout(()=> {
            e.target.value = ''
        }, 3000)
      
    }
    console.log(searchInput)
    return(
        <div>
            <input ref={inputRef} onChange={(e)=> {handleChange(e)}} type='text'/>
            <p>{searchInput}</p>
        </div>
    )
}

export default SearchBar