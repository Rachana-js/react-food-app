import React from 'react'
import { MdSearch,BsFillBellFill,AiOutlineLogout } from '../assests/icons';
import { useDispatch, useSelector } from 'react-redux'
import { BsToggles2 } from 'react-icons/bs';
import { buttonClick } from '../animations';
import { motion } from 'framer-motion';
import { Avatar } from '@mui/material';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { setUserNull } from '../context/actions/userActions';
import { app } from '../config/firebase.config';
//import { MdLogout } from 'react-icons/md';


const DBHeader = () => {
    const user= useSelector((state) => state.user);
    const firebaseAuth = getAuth(app);
  const navigate =useNavigate();
  const dispatch = useDispatch();
  const signOut =() =>{
    firebaseAuth
    .signOut()
    .then(() =>{
      dispatch(setUserNull());
      navigate("/login",{replace:true});

    }).catch((err)=>console.log(err));

  };
  return (
    <div className="w-full flex items-center justify-between gap-3">
      <p className="text-2xl text-headingColor">
        Welcome to City
        {user?.name &&(
            <span className="block text-base text-gray-500">{`Hello  ${user?.name}...!`}</span>
        )}
      </p>
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-3 px-4 py-2 bg-white opacity-90 backdrop-blur-md rounded-md shadow-md">
            <MdSearch className="text-2xl text-gray-400"/>
            <input type="text" placeholder="Search here..."
            className="border-none outline-none bg-transparent w-32 text-base font-semibold text-textColor"/>
            <BsToggles2 className="text-2xl text-gray-400"/>
        </div>
        <motion.div {...buttonClick}
        className="w-10 h-10 rounded-md cursor-pointer bg-white opacity-90 backdrop-blur-md shadow-md flex items-center justify-center">
            <BsFillBellFill className="text-gray-400 text-xl"/>
            </motion.div>
            <div className="flex items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-md shadow-md cursor-pointer overflow-hidden">
                <motion.img
                className="w-full h-full object-cover"
                src={user?.picture ? user?.picture:Avatar}
                whileHover={{scale:1.15}}
                />
            </div>
            <motion.div {...buttonClick}
            onClick={signOut}
            className="w-10 h-10 rounded-md cursor-pointer bg-white opacity-90 backdrop-blur-md shadow-md flex items-center justify-center">
                <AiOutlineLogout className="text-gray-400 text-xl"/>

            </motion.div>

            </div>
        </div>
    </div>
  )
}

export default DBHeader
