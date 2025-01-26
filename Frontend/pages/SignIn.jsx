import React, { useState } from "react";
import axios from "axios";
import "../css/signin.css";

export default function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function confirmSignIn() {
        axios.get('http://localhost:3000/checkSession', { withCredentials: true })
            .then(response => {
                console.log('User is logged in:', response.data);
                window.location.replace("/");
            })
            .catch(error => {
                console.log('User is not logged in');
            });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username.trim() === "" || password.trim() === "") {
            setError("Username or Password cannot be empty.");
            return;
        }

        setError(""); 

        try {
            const response = await axios.post("http://localhost:3000/signIn", { username, password }, { withCredentials: true });
            console.log("Login successful:", response.data);
            // After login, confirm the session to verify if user is logged in
            confirmSignIn();
        } catch (err) {
            console.error("Login failed:", err);
            setError("Failed to login. Please check your credentials.");
        }
    };


    return (
        
        <div className="flex" onLoad={confirmSignIn}>
            <head>
                <title>Doodle</title>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" type="image/x-icon" href="/images/favicon4.png" />
            </head>
            <div className="screen__content">
                
                <form className="login" onSubmit={handleSubmit}>
                    <img src={"../src/assets/images/Drawing_1.png"} className="w-fit h-fit"/>
                    <div className="login__field">
                        <i className="login__icon fas fa-user"></i>
                        <input
                            type="text"
                            className="login__input"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            maxLength={14}
                        />
                    </div>
                    <div className="login__field">
                        <i className="login__icon fas fa-lock"></i>
                        <input
                            type="password"
                            className="login__input"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button className="create-account-button" type="submit">
                        Login
                    </button>
                </form>
                <br />
                <a href="/signup" id="signup-link">
                    Don’t have an account? Sign Up
                </a>
            </div>
            
        </div>
    );
}
