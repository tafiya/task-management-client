// import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
// import { NavLink, Outlet } from "react-router-dom";

import { FaAd,  FaHome, FaList,  } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
//import AllTasks from "../Pages/dashboard/AllTasks";

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { AuthContext } from "../Providers/AuthProvider";
import { useContext } from "react";
import Swal from "sweetalert2";

//import useAdmin from "../hooks/useAdmin";





const Dashboard = () => {

    const {user,logOut}=useContext(AuthContext);
    const handleLogout=()=>{
      logOut()
      .then(()=>{
        Swal.fire("Logout successfully done!");
      })
      .catch(error=>console.log(error));
    }
   
      // TODO: get isAdmin value from the database
      //const isAdmin=true;
     

    return (
        <div>
         
            <div className="flex md:gap-24  ">
            {/* dashboard side bar */}
            <div className="w-64  ml-12 min-h-screen bg-purple-400 ">
                <ul className="menu p-4 text-white">
             
                            <>
                                <li>
                                    <Link to='/dashboard/home'>
                                    <div className=" flex justify-center">
            <img src={user?.photoURL} className="h-48 w-48 rounded-full " alt="" />
            </div>
            <br />
            <div className=" grid justify-center">
            <h2 className="text-xl font-bold text-center"> {user?.displayName}</h2>
            </div>
                                    </Link>
               
           
            
                                    
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addTask">
                                        <FaAd></FaAd>
                                        Add a Task</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myPosts">
                                        <FaList></FaList>
                                        My Posts</NavLink>
                                </li>
                            </>
                   
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                    <a><button className=" text-white  " onClick={handleLogout}>Logout</button></a>
                    </li>
                   
                </ul>
            </div>
            {/* dashboard content */}
            <div className="md:flex-1 p-8 mt-24">
            <DndProvider backend={HTML5Backend}>
            <Outlet></Outlet>
            </DndProvider>
                
              
              
            </div>
        </div>
      
        </div>
    
    );
};

export default Dashboard;

