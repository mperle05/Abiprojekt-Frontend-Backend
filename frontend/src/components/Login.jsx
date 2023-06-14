import React, { useState, useContext } from "react";

import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";

const Login = () => {

    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [errorMessage, SetErrorMessage] = useState("");
    const [, setToken] = useContext(UserContext);

    const submitLogin = async () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify(
                `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
                )
        }

        const response = await fetch("https://fastapi-mperle05.herokuapp.com/login", requestOptions);
        const data = await response.json();

        // console.log(data);

        if(!response.ok) {
            SetErrorMessage(data.detail);
        } else {
            setToken(data.access_token); 
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitLogin();
    }



    return(
        <div className="column">
            <form className="box" onSubmit={handleSubmit}>
                <h1 className="title hast-text-centered">Login</h1>
                <div className="field">
                    <label className="label">Email Address</label>
                    <div className="control">
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => SetEmail(e.target.value)}
                            className="input"
                            required
                        />


                        <label className="label">Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => SetPassword(e.target.value)}
                            className="input"
                            required
                        />

                    </div>
                </div>
                
                <ErrorMessage message={errorMessage} />

                <br />
                <button className="button is-primary" type="submit">
                    Login
                </button>
            </form>
        </div>
    );


}

export default Login;