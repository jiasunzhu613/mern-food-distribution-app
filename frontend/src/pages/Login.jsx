import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

function Login(props){
    const navigate = useNavigate();
    const [data, setData] = useState("")
    // const [user, setUser] = useState({})
    // const [email, setEmail] = useState("")


    // async function handleChange(event){
    //     console.log(event.target)
    //     const {name, value} = event.target;
    //     await setUser({...user, [name]: value});
    //     console.log(user.pw)
    // }

    // function handleChange1(event){
    //     console.log(event.target)
    //     const {value} = event.target;
    //     setEmail(value);
    // }
    function handleSubmit(e){
        const email = document.getElementById("eMail").value;
        const pw = document.getElementById("pw").value;
        console.log(email + " " + pw)
        e.preventDefault()
        axios.post("http://localhost:5555/user/login", {
            email: email,
            password: pw
            })
            .then(d => {
                if (d.data === 'success') {
                    props.login(email);
                    navigate("/donor");
                } else{
                    alert("INCORRECT EMAIL OR PASSWORD")
                }
            })
            .catch((error) => console.log(error));
        // console.log(data);
        // if (data === 'success') {
        //     props.login(email);
        //     navigate("/");
        // } else{
        //     alert("INCORRECT EMAIL OR PASSWORD")
        // }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor={"eMail"}>E-Mail</label><br/>
                <input required={true} type="text" id="eMail"/><br/>
                <label htmlFor={"pw"}>Password</label><br/>
                <input required={true} type="text" id="pw"/><br/>
                <input type="submit"/>
            </form>
        </div>)

}

Login.prototype = {
    login: PropTypes.func
}

export default Login

