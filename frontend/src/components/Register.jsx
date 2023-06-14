import react, { useEffect, useState, useContext } from 'react';

import { UserContext } from "../context/UserContext";
import ErrorMessage from './ErrorMessage';

const Register = () => {
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");    
    const [confirmationPassword, SetConfirmationPassword] = useState("");    
    const [errorMessage, SetErrorMessage] = useState("");
    const [, setToken] = useContext(UserContext);

    const submitRegistration = async () => {

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: email, password: password})
        };

        const response = await fetch("https://fastapi-mperle05.herokuapp.com/users", requestOptions);
        const data = await response.json();

        // console.log(data);

        if(!response.ok) {
            SetErrorMessage(data.detail);
        } else {
            SetErrorMessage("Created user successfully. Pls. login.");
            // setToken(data.access_token); 
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmationPassword && password.length > 5) {
            submitRegistration();
        } else{
            SetErrorMessage("Ensure that the password match and greater than 5 characters");
        } 
    }




    return(
        <div className="column">
            <form className="box" onSubmit={handleSubmit}>
                <h1 className="title hast-text-centered">Register</h1>
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

                        <label className="label">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={confirmationPassword}
                            onChange={(e) => SetConfirmationPassword(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                </div>
                
                <ErrorMessage message={errorMessage} />

                <br />
                <button className="button is-primary" type="submit">
                    Register
                </button>
            </form>
        </div>
    )
};

export default Register;