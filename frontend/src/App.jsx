import React from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Donor from "./pages/Donor.jsx";
import Recipient from "./pages/Recipient.jsx";


const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/donor' element={<Donor/>}/>
            <Route path='/donor/login' element={<Donor/>}/>
            <Route path='/recipient' element={<Recipient/>}/>
            <Route path='/recipient/login' element={<Recipient/>}/>
        </Routes>
    )
}

export default App