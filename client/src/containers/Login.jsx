import React, { useEffect, useState } from 'react';
import {LoginBg, logo} from "../assests";
import { LoginInput } from '../Components';
//import {FaEnvelope} from "../assests/icons"
import {FcGoogle, MdEmail, MdLock} from '../assests/icons'
import {motion} from "framer-motion"
import { buttonClick } from '../animations';
import {getAuth,signInWithPopup,GoogleAuthProvider,
createUserWithEmailAndPassword, 
signInWithEmailAndPassword} from "firebase/auth";
import {app} from "../config/firebase.config";
import { validateUserJWTToken } from '../api';
import {useNavigate} from "react-router-dom"
import { setUserDetails } from '../context/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { alertInfo, alertWarning } from '../context/actions/alertActions';

const Login = () => {
const [userEmail, setuserEmail] = useState("");
const [isSignUp, setisSignUp] = useState(false);
const [password, setPassword] = useState("");
const [confirm_password, setconfirm_password] = useState("");

const firebaseAuth = getAuth(app);
const provider = new GoogleAuthProvider();
const navigate = useNavigate();
const dispatch = useDispatch();
const user = useSelector((state) =>state.user);
const alert = useSelector((state) =>state.alert);

useEffect(()=>{
  if(user){
    navigate("/" , {replace : true});
  }

},[user,navigate]);

const loginwithGoogle= async () =>{
  await signInWithPopup(firebaseAuth,provider).then(userCred=>{
    firebaseAuth.onAuthStateChanged(cred=>{
      if(cred){
        cred.getIdToken().then(token=>{
         validateUserJWTToken(token).then(data =>{
          dispatch(setUserDetails(data));
         });
         navigate("/",{replace:true});
        });
      }
    })
  })
};
  const signUpWithEmailPass = async () => {
    if(userEmail === "" || password === "" || confirm_password=== ""){
      dispatch(alertInfo("Required fields should not be empty"));
    }else{
      if(password===confirm_password){
        setuserEmail("");
        setPassword("");
        setconfirm_password("");
        await createUserWithEmailAndPassword(
          firebaseAuth,
          userEmail,
          password).then(userCred =>{
          firebaseAuth.onAuthStateChanged(cred=>{
            if(cred){
              cred.getIdToken().then(token=>{
               validateUserJWTToken(token).then(data =>{
               dispatch(setUserDetails(data));
               });
               navigate("/",{replace:true});
              });
            }
          });
        })
        
      }else{
        dispatch(alertWarning("Password doesn't match"));
      }
    }
  };
  
  
  const signInWithEmailPass = async () => {
      if (userEmail !== "" && password !==""){
        await signInWithEmailAndPassword(firebaseAuth,userEmail,password).then(userCred =>{
          firebaseAuth.onAuthStateChanged(cred=>{
            if(cred){
              cred.getIdToken().then(token=>{
               validateUserJWTToken(token).then(data =>{
               dispatch(setUserDetails(data));
               });
               navigate("/",{replace:true});
              });
            }
          });

        })
      }else{
        dispatch(alertWarning("Password doesn't match"));
      }
  };
  return (
  <div className="w-screen h-screen relative overflow-hidden flex">
  {/*background image*/}
      <img src={LoginBg} className="w-full h-full object-cover absolute top-0 left-0" 
      alt=""/>
  {/*Content Box*/}
      <div className="flex flex-col items-center bg-red-300 opacity-90 w-[80%] md:w-460 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6">
  {/*top logo section*/}
      <div className="flex items-center justify-start gap-4 w-full">
      <img src={logo} className="w-8" alt=""/>
      <p className="text-headingColor font-semibold text-2xl">City</p>
      </div>
  {/*Welcome text */}
      <p className="text-3xl font-semibold text-headingColor">Welcome Back</p>
      <p className="text-xl text-textColor -mt-6">
        {isSignUp ? "Sign Up" :"Sign In"} with following</p>
  {/*Input section*/}
      <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInput 
          placeHolder={"Email here"} 
          icon={<MdEmail className="text-xl text text-textColor"/>}
          inputState={userEmail} 
          inputStateFunc={setuserEmail} 
          type="email"
          isSignUp={isSignUp}
          />
          <LoginInput 
          placeHolder={"Password here"} 
          icon={<MdLock className="text-xl text text-textColor"/>}
          inputState={password} 
          inputStateFunc={setPassword} 
          type="password"
          isSignUp={isSignUp}
          />
          {isSignUp &&(
                      <LoginInput 
                      placeHolder={" Confirm password here"} 
                      icon={<MdLock className="text-xl text text-textColor"/>}
                      inputState={confirm_password} 
                      inputStateFunc={setconfirm_password} 
                      type="password"
                      isSignUp={isSignUp}/>

          )}
          {!isSignUp ? (
          <p>
            Doesn't have an account:{""} 
            <motion.button {...buttonClick} className="text-pink-500 underline cursor-pointer bg-transparent"
            onClick={() => setisSignUp(true)}
            >
              Create one</motion.button>
          </p>
          ) : (
          <p>
            Already have an account:{""} 
            <motion.button {...buttonClick} className="text-pink-500 underline cursor-pointer bg-transparent"
            onClick={() => setisSignUp(false)}
            >
              Sign-in here
            </motion.button>
          </p>
          )}
    {/*Button section*/}
     {isSignUp ? (
       <motion.button {...buttonClick} className="w-full px-4 py-2 
       rounded-md bg-red-700 cursor-pointer text-white text-xl capitalize hover:bg-pink-700 transition-all duration-150"
       onClick={signUpWithEmailPass}
       >
         Sign Up
       </motion.button>
     ):(
      <motion.button 
      {...buttonClick} 
      onClick={signInWithEmailPass}
      className="w-full px-4 py-2 
      rounded-md bg-red-700 cursor-pointer text-white text-xl capitalize hover:bg-pink-700 transition-all duration-150">
        Sign In
      </motion.button>
     )}
      </div>
      <div className="flex items-center justify-between gap-16">
      <div className="w-24 h-[1px] rounded-md bg-white "></div>
      <p className="text-white">Or</p>
      <div className="w-24 h-[1px] rounded-md bg-white "></div>
      </div>
      <motion.div {...buttonClick} className="flex items-center 
      justify-center px-20 py-2 bg-white opacity-100 backdrop-blur-md rounded-3xl gap-4"
      onClick={loginwithGoogle}>
      <FcGoogle className="text-3xl"/>
      <p className=" capitalize text-base text-headingColor">Signin with google</p>
      </motion.div>
     </div>
    </div>
  )
}

export default Login
