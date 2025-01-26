import React, { useState } from 'react';
import axios from "axios";
import "../css/signup.css";

function SignupForm() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '' || firstName.trim() === '' || lastName.trim() === '' || username.trim() === '') {
        setError("Ensure all fields are filled out correctly");
        return;
    }

    setError(""); 

    try {
        const response = await axios.post("http://localhost:3000/signUp", { firstName,lastName,email,username,password });
        console.log("SignUp successful:", response.data);
        setFirstName('')
        setLastName('')
        setEmail('')
        setUsername('')
        setPassword('')
        setError('')
        window.location.replace("/signin");
    } catch (err) {
        console.error("Signup failed:", err);
        setError("Failed to signup. Please check your credentials.");
    }
};

return (
  
  <form className="signup-form-container" onSubmit={handleSubmit}>
    <div>
      <label className="signup-form-label">First Name:</label>
      <input
        type="text"
        className="signup-form-input"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
    </div>
    <div>
      <label className="signup-form-label">Last Name:</label>
      <input
        type="text"
        className="signup-form-input"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
    </div>
    <div>
      <label className="signup-form-label">Email:</label>
      <input
        type="email"
        className="signup-form-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div>
      <label className="signup-form-label">Username:</label>
      <input
        type="text"
        className="signup-form-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
    <div>
      <label className="signup-form-label">Password:</label>
      <input
        type="password"
        className="signup-form-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    {error && <p className="signup-form-error">{error}</p>}
    <button className="signup-form-button" type="submit">Sign Up</button>
  </form>
);

}

export default SignupForm;
