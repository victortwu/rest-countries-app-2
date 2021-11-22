import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Countries from './pages/Countries'
import ShowPage from './pages/ShowPage'
import Home from './pages/Home'
import useFetchEverything from './useFetchEverything'
import countriesAllUrl from './data/countriesAllUrl'
import './App.css';
import { promises } from 'dns';
import TestComponent from './components/TestComponent';

const App: FC = () => {
  
  const { data: countries, countryNames, regions, countryCodeObj, isPending, error } = useFetchEverything(countriesAllUrl)

  return (
    <BrowserRouter>
    <Nav  countryNames={countryNames} regions={regions}/>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home regions={regions}/>}/>
          <Route path='/countries/:region' element={<Countries countries={countries} />} />
          <Route path='countries/:region/showpage/:country' element={<ShowPage countries={countries} countryCodeObj={countryCodeObj}/>} />
          <Route path='/test' element={<TestComponent />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
