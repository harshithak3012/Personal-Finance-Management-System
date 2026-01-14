import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX} from "react-icons/hi";
import SideMenu from "./SideMenu";
import BrandTitle from "../BrandTitle";

const Navbar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMennu] = useState(false);
  return (
    <div className='flex gap-5 bg-white border border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30'>
      <button
      className='block lg:hidden text-black'
      onClick={() => {
        setOpenSideMennu(!openSideMenu);
      }}
      >
        {openSideMenu ?(
            <HiOutlineX className="text-2xl" />
        ):(
            <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <BrandTitle size='text-xl md:text-2xl' showUnderline={false} />

      {openSideMenu &&(
        <div className='fixed top-[61px] -ml-4 bg-white'>
            <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  )
}

export default Navbar
