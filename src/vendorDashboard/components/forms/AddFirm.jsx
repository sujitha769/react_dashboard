import React ,{useState} from 'react';
import { API_URL } from '../../data/apiPath';
// import './AddFirm.css'
const AddFirm = () => {
  const [firmname,setfirmname]=useState("")
  const[area,setarea]=useState("")
  const[category,setcategory]=useState([]);
  const[region,setregion]=useState([]);
  const[offer,setoffer]=useState("");
  const[file,setfile]=useState(null);

  const handlecategorychange=(event)=>{
    const value=event.target.value;
    if(category.includes(value)){
      setcategory(category.filter((item)=>item!==value));

    }else{
      setcategory([...category,value])
    }
  }



    const handleregionchange=(event)=>{
    const value=event.target.value;
    if(region.includes(value)){
      setregion(region.filter((item)=>item!==value));

    }else{
      setregion([...region,value])
    }
  }


  const handleimageupload=(event)=>{
    const selectedImage=event.target.files[0];
    setfile(selectedImage)
  }



const HandlefirmSubmit = async (e) => {
  e.preventDefault();
  try {
    const loginToken = localStorage.getItem('loginToken');
    if (!loginToken) {
      console.error("user not authenticated");
      return;
    }

    const formdata = new FormData();
    formdata.append('firmName', firmname);

    formdata.append('area', area);
    formdata.append('offer', offer);
    // formdata.append('file', file)

    category.forEach((value) => {
      formdata.append('category', value);
    });

    region.forEach((value) => {
      formdata.append('region', value);
    });

    
    if (file) {
      formdata.append('file', file);
    }

    
    const response = await fetch(`${API_URL}/firm/add-firm`, {
      method: 'POST',
      headers: {
        'token': `${loginToken}`,
        
      },
      body: formdata
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data);
            setfirmname("");
            setarea("")
            setcategory([]);
            setregion([]);
            setoffer("");
            setfile(null)
      alert('Firm added successfully');
    }else if(data.message === "vendor can have only one firm"){
              alert("Firm Exists 🥗. Only 1 firm can be added  ")
          } else{
              alert('Failed to add Firm')
          }



    // console.log("this is firm id",data.firmId)
    const firmId=data.firmId;
    localStorage.setItem('firmId',firmId)
  } catch (error) {
    console.log("failed to add firm",error);
  }
};


  return (
    <div className="firmsection">
      <form className="tableform" onSubmit={HandlefirmSubmit}>
        <h2>Add Firm</h2>

        <label>Firm Name</label>
        <input type="text" name='firmname' value={firmname} onChange={(e)=>setfirmname(e.target.value)} />

        <label>Area</label>
        <input type="text" name='area' value={area} onChange={(e)=>setarea(e.target.value)} />

        {/* Category Section */}
        <div className="checkinpcat">
          <div className="labeldiv">
            <label>Category</label>
            </div>
          
          <div className="inputscontainer">
            <div className="checkboxcontainer">
              <input type="checkbox" id="veg" checked={category.includes('veg')} value='veg' onChange={handlecategorychange} />
              <label htmlFor="veg">Veg</label>
            </div>
            <div className="checkboxcontainer">
              <input type="checkbox" id="nonveg"  checked={category.includes('nonveg')}  value='nonveg' onChange={handlecategorychange}/>
              <label htmlFor="nonveg">Non-Veg</label>
            </div>
          </div>
        </div>

        {/* Region Section */}
        <div className="checkinpregion">
          <div className="regiondiv">   <label>Region</label></div>
       
          <div className="inputscontainer">
            <div className="checkboxcontainer">
              <input type="checkbox" id="south"  checked={region.includes('south-indian')}  value='south-indian' onChange={handleregionchange} />
              <label htmlFor="south">South Indian</label>
            </div>
            <div className="checkboxcontainer">
              <input type="checkbox" id="north"    checked={region.includes('north-indian')}  value='north-indian' onChange={handleregionchange} />
              <label htmlFor="north">North Indian</label>
            </div>
            <div className="checkboxcontainer">
              <input type="checkbox"     checked={region.includes('chinese')} id="chinese" value='chinese'  onChange={handleregionchange} />
              <label htmlFor="chinese">Chinese</label>
            </div>
            <div className="checkboxcontainer">
              <input type="checkbox"    checked={region.includes('bakery')}  id="bakery" value='bakery' onChange={handleregionchange}/>
              <label htmlFor="bakery">Bakery</label>
            </div>
          </div>
        </div>

        <label>Offer</label>
        <input type="text" name='offer' onChange={(e)=>setoffer(e.target.value)}/>

        <label  >Firm Image</label>
         <input type="file" onChange={handleimageupload} />

        <div className="btnsubmit">
          
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddFirm;
