import React from 'react'


const Navbar = ({showLoginHandler,showregHandler,showlogout,logouthandler}) => {
  // console.log(showLoginHandler)
  const firmName=localStorage.getItem('firmName')
  return (
   
   <div className="navSection">
    <div className="company">
      Vendor Dashboard
    </div>
    <div className="firmname">
      <h4>Firm Name:{firmName}</h4>
    </div>
    <div className="userAuth">
      {!showlogout?<>  <span onClick={showLoginHandler}>Login /</span>
      <span onClick={showregHandler}>Register</span></>:  <span onClick={logouthandler}>Logout</span>}
    
    
    </div>
   </div>
  )
}

export default Navbar
