import { createContext, useEffect, useState} from "react";
import { getAllTravels } from "../util/Transport";

const TravelContext = createContext();

const TravelProvider = ({ children }) => {
    const [navName , setNavName] = useState('Flights');
    const [travels , setTravels] = useState([]);
    useEffect(() => {
     const handleFetchTravel = async () => {
        const res =  await getAllTravels();
        setTravels(res);
        
     }
     handleFetchTravel();
    } , [travels]);
    return <TravelContext.Provider value={{
        navName,
        travels,
        setNavName
    }}>
        {children}
    </TravelContext.Provider>;
};

export { TravelContext, TravelProvider };