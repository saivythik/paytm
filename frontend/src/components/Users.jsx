import { useEffect, useState } from "react";
import axios from 'axios';
import {Button} from "./Button";
import { useNavigate } from 'react-router-dom';

export function Users ({}) {
    const [users, setUsers]= useState([]);
    const [filter, setFilter]=useState("");
   useEffect(()=>{
    axios.get('http://localhost:3000/api/v1/user/bulk?filter='+filter,
    {
        headers: {
        'Authorization': 'Bearer '+localStorage.getItem('token'),
    }}).then(response =>{
        console.log(filter, response);
        setUsers(response.data.users);
    }
    )
   },[filter])
    return (
        <div className="">
            <div className="font-bold mt-6 text-lg">
                {filter}
                <label className="text-base text-start"> Users</label>
                <input onChange={(e)=>setFilter(e.target.value)} className="border border-gray-400 w-full p-1" placeholder="Search users..." type="text"></input>
            </div>
            <div>
                {users.map(user => <User user={user} />)}
            </div>

        </div>
    )
}

function User ({user}) {
    const navigate = useNavigate();
    const sendMoney = (data)=>{
        navigate("/send?id="+ data._id+"&name="+data.firstName);
    };
    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="flex justify-center rounded-full h-12 w-12 bg-slate-200 mt-2 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                        {user.firstName} {user.lastName}
                </div>
            </div>  
            <div className="flex flex-col justify-center">
                    <Button  onClick={()=>{
                        const navpath = "/send?id="+user.id+"&name="+user.firstName;
                        console.log(navpath);
                    navigate(navpath);
    }       } label="Send Money" />
            </div>    
        </div>
    )
}