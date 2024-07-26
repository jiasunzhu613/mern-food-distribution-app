import React, {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Donor from "./pages/Donor.jsx";
import Recipient from "./pages/Recipient.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";


function App() {
    // const [user, setUser] = useState("");
    const [uid, setUid] = useState("");

    useEffect(() => {
        if (localStorage.getItem("loginUid") !== null){
            setUid(localStorage.getItem("loginUid"))
        }
    }, [])

    async function login(uid = "") {
        setUid(uid)
        localStorage.setItem("loginUid", uid)
    }

    async function logout() {
        setUid("")
        localStorage.removeItem("loginUid")
    }


    return (
        <Routes>
            <Route path='/' element={<Home uid={uid}/>}/>
            <Route path='/donor' element={<Donor uid={uid} logout={logout}/>}/>
            <Route path='/recipient' element={<Recipient uid={uid} logout={logout}/>}/>
            <Route path='/login' element={<Login login={login} uid={uid}/>}/>
            <Route path='/register' element={<Register/>}/>
        </Routes>
    )
}

export default App