import React from "react";
import LoginContext from "./loginContext";

const LoginState = (props) =>{

    const state = {
        "id":0,
        "name":"Guest"
    };
    return (
        <LoginContext.Provider value={state}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginState;