import { useContext } from "react"
import { TravelContext } from "../context/TravelContext"
import { AuthContext } from "../context/AuthContext";
import { PackageContext } from "../context/PackageContext";

export const  useTravel = () =>{
  return useContext(TravelContext);
}

export const useAuth = () =>{
  return useContext(AuthContext)
}

export const usePackage = () =>{
  return useContext(PackageContext);
}