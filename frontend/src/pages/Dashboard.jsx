import { Appbar } from "../components/Appbar"
import {Balance} from "../components/Balance"
import { Users } from "../components/Users"
import { useEffect, useMemo, useState } from "react"
import axios from 'axios';

export function Dashboard() {
  const [balance, setBalance] = useState("");
  useEffect(()=>{
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/api/v1/account/balance',{headers:{
      'Authorization': 'Bearer '+token,
    }}).then(response =>{
      console.log("response", response.data.balance );
      setBalance(response.data.balance);
    }).catch(err=>{
      console.log(err);
    });
    
  },[])
    return (
      <div className=" flex flex-col h-screen p-10">
        <Appbar />
        <Balance balance={balance} />
        <Users />
      </div>
    )
  }