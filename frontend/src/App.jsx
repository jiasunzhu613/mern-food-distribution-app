import React, {useState} from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Donor from "./pages/Donor.jsx";
import Recipient from "./pages/Recipient.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";


function App() {
    const [user, setUser] = useState("");
    async function login(u = "") {
        setUser(u)
    }

    async function logout() {
        setUser("")
    }


    return (
        <Routes>
            <Route path='/' element={<Home user={user}/>}/>
            <Route path='/donor' element={<Donor user={user}/>}/>
            <Route path='/recipient' element={<Recipient user={user}/>}/>
            <Route path='/login' element={<Login login={login}/>}/>
            <Route path='/register' element={<Register/>}/>
        </Routes>
    )
}

export default App