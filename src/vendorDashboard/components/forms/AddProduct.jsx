import React,{useState} from 'react';
 
import { API_URL } from '../../data/apiPath';

const AddProduct = () => {
  const [productName,setProductName]=useState("");
  const [price,setPrice]=useState("")
  const [category,setCategory]=useState([]);
  const [BestSeller,setBestSeller]=useState(false);
  const [image,setImage]=useState(null)
  const [description,setDescription]=useState("");

    const handlecategorychange=(event)=>{
    const value=event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=>item!==value));

    }else{
      setCategory([...category,value])
    }
  }


 const handleBestSeller=(event)=>{
   const value=event.target.value==='true'
   setBestSeller(value)

 }
 
  const handleimageupload=(event)=>{
    const selectedImage=event.target.files[0];
    setImage(selectedImage)
  }

  const handleAddProduct=async(e)=>{
    e.preventDefault()
    try {
      const loginToken = localStorage.getItem('loginToken');
      const firmId=localStorage.getItem('firmId')

      if(!loginToken || !firmId){
        console.error("user not authenticated")
        
      }
      const formdata = new FormData();
    formdata.append('productName', productName);

    formdata.append('price',price);
    formdata.append('description',description);
    formdata.append('image', image);
    formdata.append('bestseller', BestSeller);


    category.forEach((value) => {
      formdata.append('category', value);//  const {productName,price,category,bestseller,description}=req.body;
    });

   const response=await fetch(`${API_URL}/product/add-product/${firmId}`,{
    method:'POST',
    body:formdata
   })
   const data=await response.json()
   if(response.ok){
    alert('product added successfully')
   }
      
   setProductName("")
   setPrice("")

   setCategory([])
   setBestSeller(false)
  setDescription("")
   setImage(null)
  
   
    } catch (error) {
  
  alert("Failed to add product");
}


  }


  return (
    <div className="firmsection">
      <form className="tableform" onSubmit={handleAddProduct}>
        <h2>Add Product</h2>

        <label>Product Name</label>
        <input type="text" value={productName} onChange={(e)=>{
          setProductName(e.target.value)
        }}/>

        <label>Price</label>
        <input type="text" value={price} onChange={(e)=>{
          setPrice(e.target.value)
        }}/>

        {/* Category Section */}
        <div className="checkinpregion">
          <label>Category</label>
          <div className="inputscontainer">
            <div className="checkboxcontainer">
              <input type="checkbox" id="veg" value="veg" checked={category.includes('veg')} onChange={handlecategorychange} />
              <label htmlFor="veg">Veg</label>
            </div>
            <div className="checkboxcontainer">
              <input type="checkbox" id="nonveg" value="nonveg" checked={category.includes('nonveg')} onChange={handlecategorychange}/>
              <label htmlFor="nonveg">Non-Veg</label>
            </div>
          </div>
        </div>

        {/* BestSeller Section */}
        <div className="checkinpcat">
          <label>BestSeller</label>
          <div className="inputscontainer">
            <div className="checkboxcontainer">
              <input type="radio" id="bestseller-yes" value="true" checked={BestSeller===true} onChange={handleBestSeller}/>
              <label htmlFor="bestseller-yes">Yes</label>
            </div>
            <div className="checkboxcontainer">
              <input type="radio" id="bestseller-no" value="false"  checked={BestSeller===false} onChange={handleBestSeller} />
              <label htmlFor="bestseller-no">No</label>
            </div>
          </div>
        </div>

        <label>Description</label>
        <input type="text" onChange={(e)=>setDescription(e.target.value)} value={description}/>

        <label>Product Image</label>
        <input type="file" onChange={handleimageupload} />

        <div className="btnsubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
