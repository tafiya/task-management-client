import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate,  } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import lock from '../assets/image/Polite Chicky.gif'
import useAxiosPublic from "../hooks/UseAxiosPublic";
import Swal from "sweetalert2";
//import Swal from "sweetalert2";


const Signup = () => {
    const axiosPublic = useAxiosPublic();
    const {register,handleSubmit,reset,formState: { errors }} = useForm(); 
    const {createUser,updateUserProfile}=useContext(AuthContext); 
    const navigate =useNavigate();
    const onSubmit = data =>{
        
        createUser(data.email,data.password)
        .then(result=>{
            const loggedUser=result.user;
            console.log(loggedUser);
            updateUserProfile(data.name,data.photoURL)
            .then(()=>{
              const userInfo = {
                name: data.name,
                email: data.email
            }
              axiosPublic.post('/users', userInfo)
                .then(res => {
                  if (res.data.insertedId) {
                    console.log('user added to the database')
                    reset();
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'User created successfully.',
                      showConfirmButton: false,
                      timer: 1500
                    });
                    navigate('/');
                  }
                })


            })
            .catch(error => console.log(error))
        })
       
    } 
    return (
        <>
        <Helmet>
           <title>Chat Nook |Sign Up</title>
           </Helmet>
         <div className="hero max-w-7xl mt-20 max-h-fit mx-auto   rounded-lg">
       <div className="hero-content justify-between flex-col md:flex-row-reverse">
         <div className="text-center lg:text-left w-1/2">
           
           <img src={lock} className=" w-96 h-96" alt="" />
         </div>
         <div className="card w-1/2 max-w-lg shadow-2xl bg-base-100">
           <form onSubmit={handleSubmit(onSubmit)} className="card-body">
           <h1 className="text-5xl font-bold text-center">Sign Up!</h1>
           <div className="form-control">
               <label className="label">
                 <span className="label-text">Name</span>
               </label>
               <input type="text"  {...register("name",{ required: true })} placeholder="name" className="input input-bordered"  />
               {errors.name && <span className=" text-red-600">This field is required</span>}
             </div>
             <div className="form-control">
               <label className="label">
                 <span className="label-text">Email</span>
               </label>
               <input type="email" {...register("email",{ required: true })} placeholder="email" className="input input-bordered"  />
               {errors.email && <span className=" text-red-600">This field is required</span>}
             </div>
             <div className="form-control">
               <label className="label">
                 <span className="label-text">Image URL</span>
               </label>
               <input type="text" placeholder="photoURL" {...register("photoURL",{ required: true })} className="input input-bordered"  />
               {errors.image && <span className=" text-red-600">This field is required</span>}
             </div>
             <div className="form-control">
               <label className="label">
                 <span className="label-text">Password</span>
               </label>
               <input type="password" placeholder="password" {...register("password",{ required: true,minLength:6, maxLength: 20,
               pattern:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/})} className="input input-bordered"/>
               {errors.password?.type=='required' && <span className=" text-red-600">password is required</span>}
               {errors.password?.type=='minLength' && <span className=" text-red-600">password must be 6 characters</span>}
               {errors.password?.type=='maxLength' && <span className=" text-red-600">password must be less then 20 characters</span>}
               {errors.password?.type=='pattern' && <span className=" text-red-600">password must have One UpperLetter ,one small letter and one special character</span>}
             </div>
        
             <div className="form-control mt-6">
               <input  type="submit"  className="btn btn-primary" value="Signup" />
               
             </div>
             <p><small>Already have an Account? <Link to='/login'><span className=" text-green-700 text-xl font-semibold">Login </span></Link></small></p>
             {/* <SocialLogin></SocialLogin> */}
           </form>
         </div>
       </div>
     </div>
       </>
    );
};

export default Signup;