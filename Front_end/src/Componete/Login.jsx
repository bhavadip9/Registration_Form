import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const Login = () => {
    const history = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const loginwithgoogle = () => {
        window.open("http://localhost:8000/auth/google/callback", "_self")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please enter your email and password");
            return;
        }
        try {
            const res = await axios.post("http://localhost:8000/signup", {
                email,
                password,
            });

            if (res.data === "exist") {
                history("/home", { state: { id: email } });
            } else if (res.data === "notexist") {
                setError("User does not exist. Please create an account.");
            }
        } catch (error) {
            setError("Error: Unable to process request");
            console.error(error);
        }
    };

    return (
        <div className="login">
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    className="box"
                    type="email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    placeholder="Email"
                    name="email"
                    value={email}
                />
                <br />
                <br />

                <input
                    className="box"
                    type="password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    placeholder="password"
                    name="password"
                    value={password}
                />
                <br />
                <br />

                <input type="submit" name="submit" value="Login" className="btn" />
            </form>
            <br />
            {error && <p>{error}</p>}
            <br />
            <p>Or</p>

            <button className='login-with-google-btn' onClick={loginwithgoogle}>
                Sign In With Google
            </button>
            <br />
            <br />
            <Link to="/signup">Signup Page</Link>
        </div>
    );
};

export default Login;

