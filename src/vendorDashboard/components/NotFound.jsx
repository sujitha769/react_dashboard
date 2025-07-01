import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
    
      <div className='errorsection'>
<h1>404</h1> 
<div>Page not found</div>   
<Link to="/">
    <p>Go Back</p></Link>  
    </div>

    </>
  
  )
}

export default NotFound
