import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath';

const Login = ({showwelcomeHandler}) => {

  const[email,setemail]=useState("");
  const[password,setPassword]=useState("");
 

  const loginHandler = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`${API_URL}/vendor/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("login success");
      setPassword("")
      setemail("")
      
      localStorage.setItem('loginToken', data.token);
      showwelcomeHandler()
    }
       const vendorId=data.vendorId
       console.log("checking for vendor id",vendorId)
       const vendorResponse=await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
      const vendorData=await vendorResponse.json();
     if(vendorResponse.ok){
      const vendorFirmId=vendorData.vendorFirmId;
      const vendorFirmName=vendorData.vendor.firm[0].firmName;
      // console.log("firmname",vendorFirmName)
      console.log("checking for firm id",vendorFirmId)
      localStorage.setItem('firmId',vendorFirmId)
      localStorage.setItem('firmName',vendorFirmName)
        window.location.reload()

      }
  } catch (error) {

    alert("login failed");
  }
}


   
  return (
   
   <div className="loginsection">
  
    <form className='authForm' onSubmit={loginHandler}>
        <h3>Vendor Login</h3><br/>
      <label>Email</label>
      <input type='text' name='email' value={email} onChange={(e)=>setemail(e.target.value)} placeholder='Enter Email'/><br/>
            <label>Password</label>
      <input type='Password' name='password' onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Enter Password'/><br/>
      <div className="btnsubmit">
        <button type='submit'>Submit</button>
      </div>
    </form>
   </div>
  )
}

export default Login
