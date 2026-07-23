import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar";
import HomeDante from "./pages/HomeDante";
function App() {
  return(
    <div className='App_container'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <HomeDante  status={"activeDante"}/> } />
            <Route path='/vergil' ></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}
export default App;