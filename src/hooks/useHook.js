import { useContext } from "react"
import { TravelContext } from "../context/TravelContext"

export const  useTravel = () =>{
  return useContext(TravelContext);
}