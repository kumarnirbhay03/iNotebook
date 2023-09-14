import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import authContext from '../context/auth/authContext';
import alertContext from '../context/alert/alertContext';

const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const cpasswordRef = useRef();
    const { signUp } = useContext(authContext);
    const { showAlert } = useContext(alertContext);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordRef.current.value === cpasswordRef.current.value) {
            const email = emailRef.current.value;
            const password = passwordRef.current.value;
            const name = nameRef.current.value;
            const res = await signUp({ name, email, password });
            if (res.success) {
                navigate("/login");
                showAlert({ message: "SignUp Successfully", type: "success" });
            } else {
                showAlert({ message: "SignUp error", type: "danger" });
            }
            // console.log(res);
            emailRef.current.value = "";
            passwordRef.current.value = "";
            cpasswordRef.current.value = "";
            nameRef.current.value = "";
        } else {
            showAlert({ message: "confirm password do not matched", type: "danger" });
        }
    }
    return (
        <div className='container w-50 p-5'>
            <h2>SignUp to use iNoteBook</h2>
            <div className="card" >
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" ref={nameRef} minLength={3} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" ref={emailRef} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" ref={passwordRef} minLength={5} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="cpassword" ref={cpasswordRef} minLength={5} required />
                        </div>
                        <button type="submit" className="btn btn-primary">SignUp</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
