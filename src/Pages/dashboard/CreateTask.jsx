import { useForm } from "react-hook-form";
import UseAuth from "../../hooks/UseAuth";
import useAxiosPublic from "../../hooks/UseAxiosPublic";
import Swal from "sweetalert2";


const CreateTask = () => {
    const { register,handleSubmit,reset} = useForm();
    const {user}=UseAuth();
 
   
    
    const axiosPublic = useAxiosPublic();
  
    const onSubmit = async (data) => {
        console.log(data)
             const status='todo';
            const taskItem = {
              
               
                priority: data.priority,
                status:status,
                date:data.date,
                title: data.title,
                taskdetails: data.taskdetails,
         
            }
        
            // 
            const taskRes = await axiosPublic.post('/tasks', taskItem);
            console.log(taskRes.data)
            if(taskRes.data.insertedId){
                //show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `A task is added .`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
     
    
    return (
        <div>
            <div>
        {/* onSubmit={handleSubmit(onSubmit)} */}
            <form onSubmit={handleSubmit(onSubmit)}>
              
       
             
            
                <div className="flex gap-6">
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Task title *</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Task title"
                        {...register('title', { required: true })}
                        required
                        className="input input-bordered w-full" />
                </div>
                    {/* Priority*/}
                    <div className="form-control w-1/4 my-6">
                        <label className="label">
                            <span className="label-text">Priority*</span>
                        </label>
                        <select defaultValue="default" {...register('priority', { required: true })}
                            className="select select-bordered w-full">
                            <option disabled value="default">Select a Priority</option>
                            <option value="salad">Low</option>
                            <option value="pizza">Moderate</option>
                            <option value="soup">High</option>
                           
                        </select>
                    </div>

               

                </div>
                {/* taskdetails details */}
                <div className="form-control w-1/3">
                    <label className="label">
                        <span className="label-text">task Description</span>
                    </label>
                    <textarea {...register('taskdetails')} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                </div>

                  {/* price */}
                  <div className="form-control w-1/3 my-6">
                        <label className="label">
                            <span className="label-text">deadlines*</span>
                        </label>
                        
                        <input
                        type="date"
                        placeholder="deadlines"
                        {...register('deadlines', { required: true })}
                        required
                        className="input input-bordered w-full" />
                      
                    </div>
               

             

                <button className="btn my-4 btn-accent  ">
                    Create task 
                </button>
            </form>
        </div>
            
        </div>
    );
};

export default CreateTask;