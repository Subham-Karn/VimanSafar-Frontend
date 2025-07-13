
import { Home, Package, Train } from 'lucide-react';
import { BiSolidPlaneAlt } from "react-icons/bi";
import { IoBusOutline } from "react-icons/io5";
export const navLink = [
   {
    name: 'Home',
    icon: <Home width={20} height={20}/>,
    path: '/'
   },
  {
    name: 'Flights',
    icon: <BiSolidPlaneAlt className='text-2xl'/>,
    path: '/flights'
  },
  {
    name: 'Trains',
    icon: <Train width={20} height={20}/>,
    path: '/trains'
  },
  {
    name: 'Bus',
    icon: <IoBusOutline className='text-2xl'/>,
    path: '/bus'
  },
  {
    name:"Packages",
    icon: <Package  width={20} height={20}/>,
    path: '/packages'
  }
] 

export const BookingDeatils = [
  {
    name:"Flight",
    icon: <BiSolidPlaneAlt className='text-2xl'/>
  },
  {
    name:"Train",
    icon: <Train width={20} height={20}/>
  },
  {
    name:"Bus",
    icon: <IoBusOutline className='text-2xl'/>
  },
  {
    name:"Package",
    icon: <Package  width={20} height={20}/>
  }
]