import React from "react";
import AuthContext from "./authContext";

const AuthState = (props) => {
    const host = "http://localhost:5000"

    const signUp = async (credential) => {
        const { name, email, password } = credential;
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });
        const res = await response.json();
        return res;
    }

    const logIn = async (credential) => {
        const { email, password } = credential;
        // console.log(email, password);
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const res = await response.json();
        // console.log(res);
        return res;
    }


    return (
        <AuthContext.Provider value={{ logIn, signUp }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;