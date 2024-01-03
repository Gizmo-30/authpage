import React from 'react';
import {useState, createContext} from "react";

export const SuccessContext = createContext();
export const SuccessProvider = (props) => {
    const [success, setSuccess] = useState(false);
    return (
        <SuccessContext.Provider value={[success, setSuccess]}>
            {props.children}
        </SuccessContext.Provider>
    )
}