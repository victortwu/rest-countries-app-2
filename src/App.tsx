import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getData } from './data/countriesData'
import Nav from './components/Nav'
import Countries from './pages/Countries'
import ShowPage from './pages/ShowPage'
import Home from './pages/Home'

import './App.css';
import { promises } from 'dns';

const App: FC = () => {
  
  const [countries, setCountries] = useState<any[]>([])
  const [countryNames, setCountryNames] = useState<string[]>([])
  const [regions, setRegions] = useState<string[]>([])
  const [countryCodeObj, setCountryCodeObj] = useState<any>({})

  
  useEffect(()=> {
    let countriesData: any[] = []
    let countryNameArr: string[] = []
    let countryRegionSet = new Set<string>()
    let codeObj: object = {}
    const getCountries = async()=> {
      return await getData()
      .then(res=> {
        return res
      })
      .then(data=> {
        countriesData = [...countriesData, data]
        setCountries(countriesData[0])
        countriesData[0].map((country: any)=> {
          countryNameArr.push(country.name.common)
          countryRegionSet.add(country.region)
        })
        setCountryNames(countryNameArr)
        setRegions(Array.from(countryRegionSet))
        codeObj = countriesData[0].reduce((country: any, curr: any) => ({
          ...country, [curr.cca3]: curr.name.common
        }), {})
        setCountryCodeObj(codeObj)
      })
      
    }
    //countriesData = [...countriesData, getCountries()]
    getCountries()
  }, [])
console.log(regions)

  return (
    <BrowserRouter>
    <Nav/>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home regions={regions} />}/>
          <Route path='/countries/:region' element={<Countries countries={countries} />} />
          <Route path='countries/:region/showpage/:country' element={<ShowPage countries={countries} countryCodeObj={countryCodeObj}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
