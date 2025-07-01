import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath';

const Register = ({showLoginHandler}) => {
  const [username,setuserName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[error,setError]=useState("");
 const [loading,setLoading]=useState(true)

 
 const handleSubmit=async(e)=>{
  e.preventDefault();
  try {
    const response=await fetch(`${API_URL}/vendor/register`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({username,email,password})
    })
const data=await response.json();
if(response.ok){
  console.log(data);
  setuserName("")
  setEmail("");
  setPassword("")
  alert("vendor registered successfully")
      showLoginHandler();
    
}else{
  setError(data.error);
  alert("registration failed contact admin")
}
  } catch (error) {
    console.error("registration failed",error)
    alert("failed to register")

  }
 }
  return (
   <div className="registerSection">
     <form className='authForm' onSubmit={handleSubmit}>
        <h3>Vendor Register</h3><br/>
        <label>Username</label>
      <input type='text'name='username' value={username} onChange={(e)=>{setuserName(e.target.value)}} placeholder='Enter Name'/><br/>
      <label>Email</label>
      <input type='text' name='email'  value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Enter Email'/><br/>
            <label>Password</label>
      <input type='Password' name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter Password'/><br/>
      <div className="btnsubmit">
        <button type='submit'>Submit</button>
      </div>
    </form>
   </div>
  )
}

export default Register
