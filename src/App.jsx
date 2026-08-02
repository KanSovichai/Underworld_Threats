import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar";
import HomeDante from "./pages/HomeDante";
import HomeVergil from './pages/HomeVergil';
import AboutUs from './pages/AboutPage';
import ContactUs from './pages/ContactUs';
import LogIn from './pages/LogInPage';
import Register from './pages/RegisterPage';
function App() {
  return(
    <div className='App_container'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <HomeDante  status={"activeDante"}/> } />
            <Route path='/vergil' element={ <HomeVergil status={"activeVergil"} ></HomeVergil> }></Route>
            <Route path='/aboutus' element={ <AboutUs></AboutUs> } ></Route>
            <Route path='/contactus' element={ <ContactUs></ContactUs> } ></Route>
            <Route path='/auth/login' element={ <LogIn></LogIn> } ></Route>
            <Route path='/auth/register' element={ <Register></Register> } ></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}
export default App;