import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export function SendMoney({}) {
    const [searchParams] = useSearchParams();
    const to = searchParams.get('id');
    const name = searchParams.get('name');
    const [amount, setAmount]= useState(0);
    const [res, setRes] = useState("");
    const transfer = () =>{
        const token = localStorage.getItem('token');
        axios.post('http://localhost:3000/api/v1/account/transfer',
        {
            amount:amount,
            to: to
        },
            {
                headers:{
                    'Authorization': 'Bearer '+token,
                }
            }
        ).then(response=>{
           
            setRes(<div className='text-green-600'>{response.data.message}</div>);
            console.log(res)
        }).catch(err=>{
            console.log("err",err);
            setRes(<div className='text-red-600'>{err.response.data.message}</div>);
        }
        )
    };

    return (
        <div className="flex justify-center h-screen bg-gray-100">
           <div className="h-full flex flex-col justify-center">
                <div className="border shadow h-min max-w-md p-4 space-y-4"> 
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center"> Send Money </h2> 
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="flex justify-center items-center rounded-full h-12 w-12 bg-green-500">
                                <span className="text-white text-2xl">
                                    {name[0]}
                                </span>
                            </div>
                            <h3 className="text-2xl font-semibold">
                                {name}
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-base text-start"> Amount (in Rs)</label>
                                <input onChange ={(e)=>{
                                    setAmount(e.target.value)
                                }} className="border border-gray-400 w-full p-1 rounded-md" placeholder="Enter Amount" type="Number"></input>
                            </div>
                            <button onClick={transfer} type="button" className="justify-center w-full text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                Intiate Transfer
                            </button>
                            {res}
                        </div>
                    </div>
                </div>
           </div>
        </div>
    )
}