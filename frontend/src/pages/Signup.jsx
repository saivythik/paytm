
import {Heading} from '../components/Heading';
import {SubHeading} from '../components/SubHeading';
import {InputBox} from '../components/InputBox';
import {Button} from '../components/Button';
import {BottomWarning} from '../components/BottomWarning';
import { useState } from 'react';
import axios from 'axios';


export function Signup() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (setFunc, e )=>{
      setFunc(e.target.value);
  }

  const onClick = ()=>{
    axios.post('http://localhost:3000/api/v1/user/signup',{
      "username": email,
      "firstName": firstName,
      "lastName": lastName,
      "password": password,
      "email": email
    }).then(response => {
      console.log("Response after the result",response);
      localStorage.setItem("token", response.data.token);
    }).catch( error => {
      console.log("Error from the singnup request error is ", error);
      setError(error.response.data.message);
    }
    )
  }
  const errorval = error ? 
    <div className="text-red-600"> {error} </div>
    :"";
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="bg-white w-80 text-center p-2 h-max px-4 border-slate-900">
          <Heading label="Sign Up"/>
          <SubHeading label="Enter your information to create an account"/>
          <InputBox label="First Name" type="text" placeholder="Jhon" onChange={
            (e)=>{
              onChange(setFirstName, e);
            }
          }
          />
          <InputBox label="Last Name" type="text" placeholder="Doe" onChange={
            (e)=>{
              onChange(setLastName, e);
            }
          }/>
          <InputBox label="Email" type="email" placeholder="sai@gmail.com" onChange={
            (e)=>{
              onChange(setEmail, e);
            }
          }/>
          <InputBox label="Password" type="password" placeholder="********" onChange={
            (e)=>{
              onChange(setPassword, e);
            }
          }/>
          <div className='pt-4'>
            <Button label="Sign Up" onClick={onClick}/>
          </div>
        {errorval}
          <BottomWarning label="Already have an account?" buttonLabel="Sign in" link="/signin"/>
          
        </div>
      </div>
    </div>
  )
}