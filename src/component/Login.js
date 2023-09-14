import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import authContext from '../context/auth/authContext';
import alertContext from '../context/alert/alertContext';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const { showAlert } = useContext(alertContext);
    const { logIn } = useContext(authContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const res = await logIn({ email, password });
        if (res.success) {
            localStorage.setItem('token', res.authtoken);
            navigate("/");
            showAlert({ message: "logged in Successfully", type: "success" });
        } else {
            showAlert({ message: "login error", type: "danger" });
        }
        emailRef.current.value = "";
        passwordRef.current.value = "";
    }

    return (
        <div className='container w-50 p-5'>
            <h2>LogIn to use iNoteBook</h2>
            <br></br>
            <div className="card" >
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" ref={emailRef} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" ref={passwordRef} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
