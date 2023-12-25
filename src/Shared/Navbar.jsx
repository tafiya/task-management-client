import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";



const Navbar = () => {
  const {user,logOut}=useContext(AuthContext);
  const handleLogout=()=>{
    logOut()
    .then(()=>{
      Swal.fire("Logout successfully done!");
    })
    .catch(error=>console.log(error));
  }
    const navOption=<>
    
    <li><a className="  font-medium text-lg text-white  hover:underline" href="#about">About</a></li>
    <li><a className="  font-medium text-lg text-white  hover:underline" href="#education">Home</a></li>
<li><a className="  font-medium text-lg text-white  hover:underline" href="#contact">Contact</a></li>

          
    </>
    return (
        <div className="navbar w-full text-white fixed z-10 bg-opacity-20 bg-black">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
             {navOption}
            </ul>
          </div>
       
         {/* <img src={logo} className=" w-14 h-8 rounded-2xl" alt="" /> */}
         <a className="btn btn-ghost text-white normal-case italic text-2xl ">TaskMasterHub</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
          {navOption}
          </ul>
        </div>
        <div className="navbar-end">
        { user?<div>
          
          <a><button className="btn btn-outline hover:bg-purple-400   text-white  " onClick={handleLogout}>Logout</button></a>
      </div> :<Link to='/login'><button className=" btn btn-outline hover:bg-purple-4000 text-white ">Join us</button></Link>
    
      }
       
        </div>
    
      </div>
    );
};

export default Navbar;