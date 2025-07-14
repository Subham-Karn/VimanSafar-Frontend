import { createContext, useEffect, useState } from "react";
import { getAllPackageBookings, getAllPackages } from "../util/packageApi";

const PackageContext = createContext();

const PackageProvider = ({ children }) => {
    const [packages , setPackages] = useState([]);
    const [bookedPackegs , setBookedPackages] = useState([])
    useEffect(() => {
        const handleFetchPackages = async () => {
            const res = await getAllPackages();
            setPackages(res);
        }
        handleFetchPackages();
    },[packages]);

    useEffect(() => {
        const handleFetchBookedPackages = async () => {
            const res = await getAllPackageBookings();
            setBookedPackages(res.packages);
         
            
        }
        handleFetchBookedPackages();
    },[bookedPackegs]);
    return (
        <PackageContext.Provider value={{
            packages,
            setPackages,
            bookedPackegs,

        }}>
        {children}
        </PackageContext.Provider>
    );
};

export { PackageContext, PackageProvider };