import {createContext, useState} from "react";

export const CounterContext = createContext(null);


export const CounterProvider = ({ children }) => {
    const [counter, setCounter] = useState(10);

    return (
        <CounterContext.Provider
            value={{
                counter,
                setCounter
            }}
        >
            {children}
        </CounterContext.Provider>
    );
};
