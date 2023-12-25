import { useQuery } from "react-query";
import useAxiosPublic from "./UseAxiosPublic";


const useTasks = () => {
    const axiosPublic = useAxiosPublic();
 

    const {data: tasks = [], isPending: loading, refetch} = useQuery({
        queryKey: ['tasks'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/tasks');
            return res.data;
        }
    })


    return [tasks,loading, refetch]
};

export default useTasks;