import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./SignIn.css";

function SignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const regex =
      /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

    const isValidEmail = regex.test(email);
    if (!isValidEmail) {
      setEmailError(true);
      return;
    }
    document.cookie = `loggedIn=true; max-age=${60 * 60}`;
    navigate('/products')
  };

  return (
    <div>
      <header>
        <img src="logo192.png" alt="Company brand logo" />
      </header>
      <main>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <h1>Create your account</h1>
            <div className="form-field">
              <input
                type="email"
                className={`form-input${emailError ? " error" : ""}`}
                placeholder=""
                value={email}
                onChange={(e) => {
                  setEmailError(false);
                  setEmail(e.target.value);
                }}
              />
              <label
                htmlFor=""
                className={`form-label${emailError ? " error" : ""}`}
              >
                Email Address
              </label>
            </div>
            <div className="form-field">
              <input
                type="password"
                className="form-input"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="" className="form-label">
                Password
              </label>
            </div>
            <button type="submit" className="button submit-button">
              SIGN UP
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default SignIn;
