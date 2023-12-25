import { useEffect, useState } from "react";
import useTasks from "../../hooks/useTasks";
import { useDrag, useDrop } from "react-dnd";


const ListTask = () => {
    const [tasks]=useTasks();
    console.log(tasks);
    const [newTasks,setTasks]=useState([])
     console.log(newTasks);
     useEffect(()=>{
          setTasks(tasks)
     },[tasks])
    const [todos,setTodos]=useState([]);
    const [inProgress,setInProgress]=useState([]);
    const [closed,setClosed]=useState([]);
    useEffect(()=>{
        const fTodos =newTasks.filter((task)=>task.status ==='todo');
        const fInProgress =newTasks.filter((task)=>task.status ==='inProgress');
        const fClosed =newTasks.filter((task)=>task.status ==='closed');
        setTodos(fTodos);
        setInProgress(fInProgress);
        setClosed(fClosed);

    },[newTasks])

    const statuses =["todo","inProgress","closed"];
    return (
        <div className=" flex md:flex-row flex-col gap-16">
            {
                statuses.map( (status,index)=>(
                    
                    <Section
                     key={index}
                     status={status}
                     newTasks ={newTasks}
                     setTasks={setTasks}
                     todos={todos}
                     inProgress={inProgress}
                     closed={closed}
                     />
                ))}
        </div>
    );
};

export default ListTask;

const Section =({status,newTasks,setTasks,todos,inProgress,closed})=>{
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop:(item)=> addItemToSection(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
      }));

    let text = "Todo";
    let bg = 'bg-slate-500';
    let tasksToMap =todos;

    if( status === 'inProgress')
    {
        text = "inProgress";
        bg = 'bg-purple-500';
       tasksToMap =inProgress;

    }
    if( status === 'closed')
    {
        text = "closed";
        bg = 'bg-green-500';
       tasksToMap =closed;

    }
    const addItemToSection=(id)=>{
        //console.log('dropped',id,status);
        setTasks((prev)=>{
            const mTasks =prev.map( t=>{
                if(t._id === id)
                {
                    return {...t,status: status}
                }
                return t;
            });
            localStorage.setItem('tasks',JSON.stringify(mTasks))
         
            return mTasks;
        })
    }
    return(
        <div ref={drop} className={`w-64 rounded-md p-2 ${ isOver? " bg-slate-200":""}`}>
        <Header text={text} bg={bg} count={tasksToMap.length}> </Header>
        {tasksToMap.length>0 && tasksToMap.map((task) =><Task key={task._id} task={task} newTasks={newTasks} setTasks={setTasks}></Task>)}
        </div>
    )
};
 const Header =({text,bg, count})=>{
    return(
        <div className={` ${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
            {text}
            <div className=" ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center" >
                {count}

            </div>

        </div>
    )

 };
  
 const Task =({task,newTasks,setTasks })=>{

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item:{id:task._id},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }));
      console.log(isDragging);

     const handleRemoveTask=(id)=>{
        console.log(id);
     }
    return(
        <div ref={drag} className={` relative p-4 mt-8 shadow-md rounded-md cursor-grab ${isDragging? " opacity-25":" opacity-100"}`}>
           <p>{task.title}</p>
           <button className=" absolute bottom-1 right-1 text-slate-400" onClick={()=> handleRemoveTask(task._id)}>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

           </button>
          
        </div>
    )
 }