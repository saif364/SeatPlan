

import React, { createContext, useContext } from 'react';

const GlobalStylesContext = createContext();

export const useGlobalStyles = () => useContext(GlobalStylesContext);

export const GlobalStylesProvider = ({ children }) => {
    const globalStyles = {
        shadowrounded: "shadow-xl rounded-lg",
        textColor: "text-gray-900",
        fontSize: "text-lg",
        backgroundColor: "bg-white",
        margin: "m-4",
        padding: "p-4",
        borderRadius: "rounded-md",
    };

    return (
        <GlobalStylesContext.Provider value={{ globalStyles }}>
            {children}
        </GlobalStylesContext.Provider>
    );
};