import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'
const LandingPage = () => {
  const [showlogin,setshowlogin]=useState(false);
  const[showreg,setshowreg]=useState(false);
  const[showfirm,setshowfirm]=useState(false)
  const[showproduct,setshowproduct]=useState(false)
  const[showwelcome,setshowwelcome]=useState(false)
  const[showallproducts,setshowallproducts=useState]=useState(false);
  const[showlogout,setshowlogout]=useState(false)
  const[showfirmtitle,setshowfirmtitle]=useState(true)


  useEffect(()=>{
  const loginToken=localStorage.getItem('loginToken');
  if(loginToken){
    setshowlogout(true)
     setshowwelcome(true)

  }  
  
  },[])

  useEffect(()=>{
    const firmName=localStorage.getItem('firmName');
    const firmId = localStorage.getItem('firmId')
    if(firmName|| firmId){
      setshowfirmtitle(false)
        setshowwelcome(true)
    }
  },[])

  const logouthandler=()=>{
  confirm("comfirm to logout")
  localStorage.removeItem("loginToken")
  localStorage.removeItem("firmId")
  localStorage.removeItem('firmName')
  setshowlogout(false)
  setshowfirmtitle(true)
  setshowwelcome(false)

}


  const showLoginHandler=()=>{
    setshowlogin(true)
    setshowreg(false)
    setshowfirm(false)
     setshowproduct(false)
      setshowwelcome(false)
         setshowallproducts(false)
  }

    const showregHandler=()=>{
    setshowreg(true)
    setshowlogin(false)
    setshowfirm(false)
     setshowproduct(false)
      setshowwelcome(false)
         setshowallproducts(false)
  }

const showfirmhandler=()=>{

  setshowlogin(false)
  setshowreg(false)
  setshowfirm(true)
    setshowproduct(false)
     setshowwelcome(false)
        setshowallproducts(false)
  }


const showproducthandler=()=>{
   setshowlogin(false)
  setshowreg(false)
  setshowfirm(false)
  setshowproduct(true)
   setshowwelcome(false)
    setshowallproducts(false)
}

const showwelcomeHandler=()=>{
   setshowlogin(false)
  setshowreg(false)
  setshowfirm(false)
  setshowproduct(false)
  setshowwelcome(true)
   setshowallproducts(false)
}


const showallproductsHandler=()=>{
  setshowlogin(false)
  setshowreg(false)
  setshowfirm(false)
  setshowproduct(false)
  setshowwelcome(false)
  setshowallproducts(true)


}



  return(
<>
<section className='landingsection'>
<Navbar showLoginHandler={showLoginHandler} showregHandler={showregHandler} showlogout={showlogout} logouthandler={logouthandler}/>
<div className="collectionSection" >
<Sidebar showfirmhandler={showfirmhandler} showproducthandler={showproducthandler}
showallproductsHandler={showallproductsHandler} showfirmtitle={showfirmtitle} />

{showlogin && <Login showwelcomeHandler={showwelcomeHandler}/>}
{showreg && <Register showLoginHandler={showLoginHandler}/>}

{showfirm &&  <AddFirm/>}
{showproduct &&   <AddProduct/>}
{showwelcome && <Welcome />}
{showallproducts &&  <AllProducts/>}

</div>


</section>
</>
  )
}

export default LandingPage
