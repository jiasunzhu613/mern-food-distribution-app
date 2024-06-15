import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    function handleSubmit(){
        axios.post("http://localhost:5555/user/register", {
            firstName: document.getElementById("fname").value,
            lastName: document.getElementById("lname").value,
            email: document.getElementById("eMail").value,
            password: document.getElementById("pw").value,
        }).then(
            (response) => {
                console.log(response);
            }
        ).catch((error) => console.log(error));
        navigate("/login");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor={"fname"}>First name:</label><br/>
                <input required={true} type="text" id="fname"/><br/>
                <label htmlFor={"lname"}>Last name:</label><br/>
                <input required={true} type="text" id="lname"/><br/>
                <label htmlFor={"eMail"}>E-Mail</label><br/>
                <input required={true} type="text" id="eMail"/><br/>
                <label htmlFor={"pw"}>Password</label><br/>
                <input required={true} type="text" id="pw"/><br/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default Register