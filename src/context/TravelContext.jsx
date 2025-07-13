import { createContext, useState} from "react";

const TravelContext = createContext();

const TravelProvider = ({ children }) => {
    const [navName , setNavName] = useState('Flights');
    return <TravelContext.Provider value={{
        navName,
        setNavName
    }}>
        {children}
    </TravelContext.Provider>;
};

export { TravelContext, TravelProvider };