import React from 'react'

const Sidebar = ({showfirmhandler,showproducthandler,showallproductsHandler,showfirmtitle}) => {
  return (
    
    <div className="sideBarSection">
      <ul>
        {showfirmtitle?    <li onClick={showfirmhandler}>Add Firm</li>:""}
    
        <li onClick={showproducthandler}>Add Product</li>
        <li onClick={showallproductsHandler}>All Products</li>
        <li>User Details</li>
      </ul>
    </div>
  )
}

export default Sidebar
