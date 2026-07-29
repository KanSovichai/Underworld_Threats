import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar";
import HomeDante from "./pages/HomeDante";
import HomeVergil from './pages/HomeVergil';
import AboutUs from './pages/AboutPage';
import ContactUs from './pages/ContactUs';
function App() {
  return(
    <div className='App_container'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <HomeDante  status={"activeDante"}/> } />
            <Route path='/vergil' element={ <HomeVergil status={"activeVergil"} ></HomeVergil> }></Route>
            <Route path='/aboutus' element={ <AboutUs></AboutUs> } ></Route>
            <Route path='/contactus' element={ <ContactUs></ContactUs> } ></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}
export default App;